import {
  BookOpenText,
  Edit,
  Shield,
  ShieldBan,
  Star,
  Type,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import React from "react";
import UserSearchBar from "./UserSearchBar";
import handleRemoveUserFromProject from "../utils/handleRemoveUserFromProject";
import PageLoader from "./PageLoader";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import handleEditProject from "../utils/handleEditProject";
import { Tooltip } from "react-tooltip";
import TextArea from "./TextArea";
import FocusLock from "react-focus-lock";
import useUserStore from "../store/useUserStore";
import handleAssignAdmin from "../utils/handleAssignAdmin";
import handleDeassignAdmin from "../utils/handleDeassignAdmin";
import CloseButton from "./CloseButton";
import DeleteButton from "./DeleteButton";
import ConfirmationForm from "./ConfirmationForm";
import handleDeleteProject from "../utils/handleDeleteProject";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../store/useProjectStore";
import usePermissionStore from "../store/usePermissionStore";

export default function ProjectDetails({ project, closeSidebar }) {
  const [userSearchBarShown, setUserSearchBarShown] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState(false);
  const [submitFormShown, setSubmitFormShown] = React.useState(false);

  const { userId } = useUserStore();
  const { setSelectedProjectId } = useProjectStore();

  const { adminPermission, ownerPermission } = usePermissionStore();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit" });

  function handleformSubmit(data) {
    if (data.title === project.title && data.description === project.description) {
      return;
    }

    handleEditProject(project._id, data.title, data.description);
    setEditingProject(false);
  }

  if (!project || !Array.isArray(project.members)) {
    return <PageLoader />;
  }
  return (
    <FocusLock>
      <div className='flex flex-col gap-4 items-start'>
        {submitFormShown && (
          <ConfirmationForm
            label={"Do you want to delete this project?"}
            onCancel={() => setSubmitFormShown(false)}
            onSubmition={async () => {
              await handleDeleteProject(project._id, userId, () => {
                navigate("/profile");
                setSelectedProjectId(null);
              });
            }}
          />
        )}
        <div className='self-end'>
          <CloseButton close={closeSidebar} />
        </div>
        <div className='flex flex-col gap-8 self-stretch items-start'>
          <form onSubmit={handleSubmit(handleformSubmit)} className='flex flex-col gap-6 w-full'>
            <div className='flex items-center justify-between gap-2'>
              <p className='text-oxford-blue text-2xl font-black leading-[1]'>
                Project Information
              </p>
              {ownerPermission && (
                <button
                  className='relative flex self-start items-center gap-4 hover:-translate-y-[.5px]'
                  type='button'
                  onClick={() => setEditingProject(!editingProject)}
                >
                  <Edit color='#001b2e' />
                </button>
              )}
            </div>
            <div
              className='flex flex-row gap-8'
              style={{ flexDirection: editingProject ? "column" : "column" }}
            >
              {!editingProject ? (
                <div className='flex flex-col gap-4'>
                  <p className='text-xl text-oxford-blue font-bold flex items-center gap-2'>
                    <Type />
                    Title
                  </p>
                  <p className='p-3 rounded-xl shadow-inner'>{project?.title}</p>
                </div>
              ) : (
                <Input
                  errors={errors}
                  register={register}
                  registerContent={{
                    required: "Title is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  name={"title"}
                  label={"Title"}
                  id={"title"}
                  type={"text"}
                  disabled={!editingProject}
                  defaultValue={project?.title}
                />
              )}
              {!editingProject ? (
                <div className='flex flex-col gap-4'>
                  <p className='text-xl text-oxford-blue font-bold flex items-center gap-2'>
                    <BookOpenText />
                    Description
                  </p>
                  <p className='p-3 rounded-xl shadow-inner'>{project?.description}</p>
                </div>
              ) : (
                <TextArea
                  errors={errors}
                  register={register}
                  registerContent={{
                    maxLength: {
                      value: 100,
                      message: "Name must be at most 30 characters",
                    },
                  }}
                  name={"description"}
                  label={`Description`}
                  limit={100}
                  id={"description"}
                  disabled={!editingProject}
                  defaultValue={project?.description}
                  watch={watch}
                />
              )}
            </div>
            {editingProject && (
              <Button style='submit' type='submit' disabled={!editingProject}>
                <p>Save Changes</p>
              </Button>
            )}
          </form>
          <div className='flex flex-col gap-6 self-stretch'>
            <div className='flex items-center gap-2'>
              <Users />
              <p className='text-xl text-oxford-blue font-bold'>Members</p>
            </div>
            <div className='bg-timberwolf rounded-md p-2 flex flex-col gap-2 max-h-72 h-72 overflow-auto'>
              {project?.members.map((member) => {
                const isUserAdmin = project?.admins.some((admin) => admin._id === member._id);

                // Value only for displaying star
                const isUserOwner = project?.owner._id === member._id;

                return (
                  <div
                    key={member._id}
                    className='rounded-sm bg-white p-2 flex items-center gap-3 w-full'
                  >
                    <img
                      src={member?.avatarUrl}
                      alt=''
                      className='h-10 w-10 rounded-[50%]'
                      referrerPolicy='no-referrer'
                    />
                    <div className='flex flex-col gap-1 items-start'>
                      <p className='font-bold text-oxford-blue'>{member?.username}</p>
                      <p className='text-slate-500'>{member?.email}</p>
                    </div>
                    {!isUserOwner ? (
                      ownerPermission ? (
                        <div className='flex items-center gap-2 ml-auto'>
                          <button
                            onClick={() => handleRemoveUserFromProject(member._id, project._id)}
                            data-tooltip-id='user-details-tooltip'
                            data-tooltip-content='Remove user from project'
                          >
                            <UserX color='#ce2d4f' />
                          </button>
                          {
                            <button
                              data-tooltip-id='user-details-tooltip'
                              data-tooltip-content={
                                isUserAdmin ? "Deassign as admin" : "Assign as admin"
                              }
                              onClick={() => {
                                if (!isUserAdmin) {
                                  handleAssignAdmin(member, project._id);
                                  return;
                                }
                                handleDeassignAdmin(member, project._id);
                              }}
                            >
                              {isUserAdmin ? (
                                <ShieldBan color='#ce2d4f' />
                              ) : (
                                <Shield color='#001b2e' />
                              )}
                            </button>
                          }
                        </div>
                      ) : (
                        isUserAdmin && (
                          <Shield
                            color='#001b2e'
                            className='ml-auto'
                            data-tooltip-id='user-details-tooltip'
                            data-tooltip-content='User is admin'
                          />
                        )
                      )
                    ) : (
                      <Star
                        className='ml-auto'
                        color='#c5590a'
                        data-tooltip-id='user-details-tooltip'
                        data-tooltip-content='User is owner of the project! ☆'
                      />
                    )}
                  </div>
                );
              })}
              <div className='mt-auto'>
                {adminPermission &&
                  (userSearchBarShown ? (
                    <UserSearchBar
                      projectId={project._id}
                      close={() => setUserSearchBarShown(false)}
                      limit={5}
                    />
                  ) : (
                    <button
                      className='flex items-center gap-2 bg-antiflash-white shadow-md p-2 rounded-md justify-center w-full'
                      onClick={() => setUserSearchBarShown(true)}
                    >
                      <UserPlus />
                      <p>Add User</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {ownerPermission && (
            <DeleteButton onClick={() => setSubmitFormShown(true)}>Delete Project</DeleteButton>
          )}
        </div>
        <Tooltip
          id='user-details-tooltip'
          place='bottom-start'
          style={{
            backgroundColor: "#001b2e",
            borderRadius: ".5rem",
          }}
        />
      </div>
    </FocusLock>
  );
}
