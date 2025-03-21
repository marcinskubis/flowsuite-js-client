import { ChevronLeft, CirclePlus, LogOut, Star, UserRoundPen } from "lucide-react";
import NavigationBar from "./NavigationBar";
import SlideDownModal from "./SlideDownModal";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import React from "react";
import Loader from "./Loader";
import PageLoader from "./PageLoader";
import useProjectStore from "../store/useProjectStore";
import CreateProjectForm from "./CreateProjectForm";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import handleEditUser from "../utils/handleEditUser";
import handleLogOut from "../utils/handleLogOut";
import { URL } from "../config";
import ReactImageFallback from "react-image-fallback";

export default function ProfilePage() {
  const [editingUser, setEditingUser] = React.useState(false);
  const [formShown, setFormShown] = React.useState(false);

  const { userId, clearUserId } = useUserStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const { selectedProjectId, setSelectedProjectId } = useProjectStore();

  const { data, error, isLoading } = useSWR(`${URL}/api/user/${userId}`, fetcher);

  const handleFormSubmit = async (formData) => {
    if (formData.username === data.username) {
      console.log("Edited info is the same as original.");
      return;
    }
    await handleEditUser(formData.username, userId);
    setEditingUser(false);
  };

  async function logOut() {
    handleLogOut(() => navigate("/"));
    setSelectedProjectId(null);
    await clearUserId();
  }
  if (isLoading) return <PageLoader />;
  return (
    <div className='relative w-screen min-h-screen flex items-center justify-center bg-antiflash-white bg-cubes pl-4 pr-4 pb-4 pt-28 overflow-x-auto'>
      <SlideDownModal show={formShown} onClose={() => setFormShown(false)} title={"Create Project"}>
        <CreateProjectForm close={() => setFormShown(false)} />
      </SlideDownModal>
      <NavigationBar>
        {selectedProjectId && (
          <button
            to='/project'
            className='flex items-center gap-1'
            onClick={() => navigate(`/project/${selectedProjectId}`)}
          >
            <ChevronLeft color='#001b2eff' />
            <p className='text-base md:text-xl leading-tight text-oxford-blue'>
              Go to project view
            </p>
          </button>
        )}
        <div className='flex items-center gap-4 ml-auto'>
          <Link to='/profile' className='flex items-center gap-2 p-1 rounded-xl bg-[#00a5e050]'>
            <ReactImageFallback
              src={data?.avatarUrl}
              initialImage='/defaultUserImage.jpg'
              fallbackImage='/defaultUserImage.jpg'
              alt=''
              className='h-10 w-10 min-h-10 min-w-10 rounded-[50%] border border-oxford-blue'
              referrerPolicy='no-referrer'
            />
            <p className='text-oxford-blue font-bold hidden md:block'>{data?.username}</p>
          </Link>
          <button onClick={() => logOut()}>
            <LogOut size={30} />
          </button>
        </div>
      </NavigationBar>
      <div className='flex flex-col gap-8 md:grid md:grid-cols-2 w-full md:w-auto'>
        <div className='flex flex-col gap-8 bg-white p-8 rounded-md shadow-md'>
          <p className='text-3xl font-bold text-oxford-blue'>User Information</p>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <img
              src={data?.avatarUrl}
              alt=''
              className='rounded-[50%] border-2 border-oxford-blue'
            />
            <div className='flex flex-col gap-2 self-start md:self-auto'>
              <p className='text-xl text-oxford-blue max-w-64 line-clamp-1'>{data?.username}</p>
              <p className='text-lg text-slate-400 max-w-64 line-clamp-1'>{data?.email}</p>
            </div>
          </div>
          <button
            className='relative flex items-center gap-2 self-center
                        after:h-[2px] after:w-0 after:bg-raspberry after:absolute after:-bottom-1 after:rounded-md
                        after:left-1/2 after:-translate-x-1/2 after:transition-all hover:after:w-full'
            onClick={() => setEditingUser(!editingUser)}
          >
            <UserRoundPen color='#001b2eff' />
            <p className='font-bold text-oxford-blue'>Edit User Information</p>
          </button>
          <form
            className={`flex flex-col gap-4 rounded-md blur-md transition-all ${
              !editingUser && "select-none"
            }`}
            style={{
              filter: editingUser && "none",
              pointerEvents: !editingUser && "none",
            }}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            {data ? (
              <Input
                errors={errors}
                register={register}
                registerContent={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }}
                name={"username"}
                label={"Username"}
                id={"username"}
                type={"text"}
                defaultValue={data?.username}
                disabled={!editingUser}
              />
            ) : (
              <Loader />
            )}
            <Button style={"submit"} disabled={!editingUser} type='submit'>
              {isLoading ? <Loader color='white' /> : "Save changes"}
            </Button>
          </form>
        </div>
        <div className='bg-white p-8 rounded-md shadow-md flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-oxford-blue font-bold'>Your projects</p>
            <button onClick={() => setFormShown(true)}>
              <CirclePlus strokeWidth={2.5} className='hover:-translate-y-[.5px]' />
            </button>
          </div>

          <div className='flex flex-col gap-3 max-h-80 overflow-y-auto pt-3 pr-3'>
            {data?.projects
              .sort((a, b) => {
                if (a.owner === userId && b.owner !== userId) {
                  return -1;
                }
                if (a.owner !== userId && b.owner === userId) {
                  return 1;
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((project) => {
                const parsedDate = new Date(project.createdAt);
                return (
                  <button
                    key={project._id}
                    className='relative border border-timberwolf max-w-[28rem] rounded-md p-4 gap-4 grid grid-cols-2 justify-between items-center transition-all hover:shadow-xl'
                    onClick={() => {
                      setSelectedProjectId(project._id);
                      navigate(`/project/${project._id}`);
                    }}
                  >
                    {project.owner === data?._id && (
                      <Star
                        className='absolute -right-3 -top-3 w-6 h-6'
                        color='#c5590a'
                        fill='#c5590a'
                        stroke='black'
                        strokeWidth={"1px"}
                      />
                    )}
                    <div className='flex flex-col items-start gap-4'>
                      <p className='text-lg font-bold text-oxford-blue text-start text-wrap'>
                        {project.title}
                      </p>
                      <p className='text-md text-slate-500 text-start text-wrap break-all line-clamp-2'>
                        {project.description}
                      </p>
                    </div>
                    <p className='hidden md:block justify-self-end'>
                      {parsedDate.toLocaleDateString("en-US")}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
