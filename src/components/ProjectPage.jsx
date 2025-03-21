import { Link, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import useUserStore from "../store/useUserStore";
import StatusBoard from "./StatusBoard";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import PageLoader from "./PageLoader";
import {
  Calendar,
  PanelsTopLeft,
  Settings,
  UserRoundCheck,
  UserRoundX,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import Sidebar from "./Sidebar";
import ProjectDetails from "./ProjectDetails";
import ErrorPage from "./ErrorPage";
import ReactFlowGraph from "./ReactFlowGraph";
import dayjs from "dayjs";
import usePermissionStore from "../store/usePermissionStore";
import checkUserPermission from "../utils/checkUserPermission";
import { URL } from "../config";
import FilterSwitch from "./FilterSwitch";
import { Tooltip } from "react-tooltip";

export default function ProjectPage() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [projectView, setProjectView] = React.useState("board");

  const id = React.useId();

  const { userId } = useUserStore();
  const { setAdminPermission, setOwnerPermission } = usePermissionStore();
  const { projectId } = useParams();

  const { data, error, isLoading } = useSWR(`${URL}/api/project/${projectId}`, fetcher);

  const { data: user } = useSWR(`${URL}/api/user/${userId}`, fetcher);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const currentDateFormatted = dayjs().format("MMMM D, YYYY");

  React.useEffect(() => {
    if (data) {
      const { userAdminPermission, userOwnerPermission } = checkUserPermission(data, userId);

      setAdminPermission(userAdminPermission);
      setOwnerPermission(userOwnerPermission);
    }
  }, [data, setAdminPermission, setOwnerPermission, userId]);

  if (isLoading) return <PageLoader />;

  if (error) return <ErrorPage />;

  return (
    <div className='relative flex flex-col items-center justify-end w-screen min-h-screen bg-antiflash-white pt-24'>
      <NavigationBar>
        <div className='flex items-center gap-4 md:gap-10 text-oxford-blue md:text-2xl font-semibold rounded-3xl leading-[1]'>
          <button
            className={`flex items-center gap-2 relative origin-bottom transition-all ${
              projectView !== "board" && "hover:text-oxford-blue hover:scale-105 text-gray-400 "
            } `}
            onClick={() => {
              setProjectView("board");
            }}
          >
            {projectView === "board" && (
              <motion.div
                layoutId={id}
                className='absolute -inset-2 bg-picton-blue opacity-75 md:top-[110%] md:opacity-100 md:h-1 md:left-0 md:right-0 rounded-xl'
                initial={{
                  opacity: 0.75,
                }}
              ></motion.div>
            )}
            <PanelsTopLeft className='relative z-10' />
            <p className='hidden md:block relative z-10'>Project</p>
          </button>
          <button
            className={`flex items-center gap-2 relative origin-bottom transition-all ${
              projectView !== "graph" && "hover:text-oxford-blue hover:scale-105 text-gray-400 "
            } `}
            onClick={() => setProjectView("graph")}
          >
            {projectView === "graph" && (
              <motion.div
                layoutId={id}
                className='absolute -inset-2 md:top-[110%] opacity-75 bg-picton-blue md:opacity-100 md:h-1 md:left-0 md:right-0 rounded-xl'
                initial={{
                  opacity: 0.75,
                }}
              ></motion.div>
            )}
            <Workflow className='cursor-pointer relative z-10' />
            <p className='hidden md:block relative z-10'>Roadmap</p>
          </button>
        </div>
        <div className='md:flex items-center gap-1 text-xl ml-auto mr-auto hidden'>
          <Calendar strokeWidth={2.5} className='w-8 h-8' />
          <p className='font-extrabold text-xl'>{currentDateFormatted}</p>
        </div>
        <Link to='/profile' className='flex items-center gap-2 p-1 rounded-xl bg-[#00a5e050]'>
          <img
            src={user?.avatarUrl}
            alt=''
            className='min-h-10 min-w-10 w-10 h-10 rounded-full border border-oxford-blue'
          />
          <p className='text-oxford-blue hidden md:block'>{user?.username}</p>
        </Link>
      </NavigationBar>
      <div className='w-full h-full flex flex-col justify-end'>
        <div className='w-full h-2 bg-line-gradient'></div>
        {projectView === "board" ? (
          <>
            <div className='w-full bg-white p-4 flex items-center justify-between h-16'>
              <p className='text-oxford-blue text-xl font-semibold md:text-2xl'>{data?.title}</p>
              <div className='flex items-center gap-8'>
                <div
                  className='flex items-center gap-2'
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Toggle to see your tasks only.'
                >
                  <UserRoundX />
                  <FilterSwitch />
                  <UserRoundCheck />
                </div>
                <button onClick={() => setShowSidebar(true)}>
                  <Settings size={26} className='hover:-translate-y-[.5px]' />
                </button>
              </div>
            </div>
            <StatusBoard statuses={data?.statuses} project={data} />
          </>
        ) : (
          <ReactFlowGraph project={data} />
        )}
      </div>
      {showSidebar && (
        <Sidebar close={() => setShowSidebar(null)}>
          <ProjectDetails project={data} closeSidebar={closeSidebar} />
        </Sidebar>
      )}
      <Tooltip
        id='my-tooltip'
        style={{
          backgroundColor: "#001b2e",
          borderRadius: ".5rem",
        }}
        place='bottom'
      />
    </div>
  );
}
