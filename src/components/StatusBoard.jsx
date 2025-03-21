import React from "react";
import StatusColumn from "./StatusColumn";
import { CirclePlus } from "lucide-react";
import CreateStatusForm from "./CreateStatusForm";
import SlideDownModal from "./SlideDownModal";
import usePermissionStore from "../store/usePermissionStore";

function StatusBoard({ statuses, project }) {
  const [showStatusForm, setShowStatusForm] = React.useState(false);

  const { adminPermission } = usePermissionStore();

  return (
    <div className='flex flex-row h-full w-full bg-transparent gap-2 p-4 overflow-x-scroll items-center max-h-[calc(100vh-6rem-0.5rem-4rem)]'>
      <SlideDownModal
        show={showStatusForm}
        onClose={() => setShowStatusForm(false)}
        title={"Create Status"}
      >
        <CreateStatusForm close={() => setShowStatusForm(false)} />
      </SlideDownModal>
      {statuses?.map((status) => (
        <StatusColumn key={status._id} status={status} project={project} />
      ))}
      {adminPermission && (
        <button
          className='group w-[300px] min-w-[300px] rounded-xl h-full bg-oxford-blue-opacity flex flex-col items-center justify-center gap-4 cursor-pointer shadow-md'
          onClick={() => setShowStatusForm(true)}
        >
          <CirclePlus size={45} color='white' />
          <p className='text-[0px] text-white h-0 group-hover:text-2xl transition-all group-focus:text-2xl'>
            Add Column
          </p>
        </button>
      )}
    </div>
  );
}

export default StatusBoard;
