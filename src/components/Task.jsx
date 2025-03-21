import React from "react";
import useDragAndDropStore from "../store/useDragAndDropStore";
import handleTaskMove from "../utils/handleTaskMove";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import TaskDetails from "./TaskDetails";
import { CalendarOff } from "lucide-react";
import dayjs from "dayjs";

export default function Task({
  task,
  status,
  highlightIndicator,
  listIndex,
  project,
  statusColor,
}) {
  const [sidebarShow, setSidebarShow] = React.useState(false);

  const { setDraggedElement, draggedElement } = useDragAndDropStore();
  const { projectId } = useParams();

  const formattedDueDate = task?.endDate ? dayjs(task.endDate).format("MMMM D, YYYY") : null;

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.target.style.border = "2px solid black";

        setDraggedElement({ id: task._id, status: status });
      }}
      onDragEnd={(event) => {
        event.preventDefault();
        event.target.style.border = "none";
        setDraggedElement(null);
        highlightIndicator(null);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        const targetRect = event.currentTarget.getBoundingClientRect();
        const midpoint = targetRect.top + targetRect.height / 2;

        if (event.clientY < midpoint) {
          highlightIndicator(Math.max(0, listIndex));
          event.dataTransfer.dropEffect = "move";
        } else {
          highlightIndicator(listIndex + 1);
          event.dataTransfer.dropEffect = "move";
        }
      }}
      onDrop={(event) => {
        event.target.style.border = "none";
        const targetRect = event.currentTarget.getBoundingClientRect();
        const midpoint = targetRect.top + targetRect.height / 2;

        if (event.clientY < midpoint) {
          handleTaskMove(
            draggedElement?.id,
            Math.max(0, listIndex),
            draggedElement?.status,
            status,
            projectId
          );
          // updateTask(draggedElement?.id, Math.max(0, listIndex), draggedElement?.status, status);
          event.dataTransfer.dropEffect = "move";
        } else {
          handleTaskMove(
            draggedElement?.id,
            listIndex + 1,
            draggedElement?.status,
            status,
            projectId
          );
          // updateTask(draggedElement?.id, listIndex + 1, draggedElement?.status, status);
          event.dataTransfer.dropEffect = "move";
        }
        highlightIndicator(null);
      }}
      onDragLeave={(event) => {
        highlightIndicator(null);
      }}
      // transition={{
      //     type: 'spring',
      //     damping: 50,
      //     stiffness: 800
      // }}
      className='w-[96%] self-center p-2 flex flex-col gap-2 rounded-md text-gray-700 cursor-move border'
      style={{
        backgroundColor: `${statusColor}30`,
        boxShadow: `0 2px 6px 0 ${statusColor}, 0 6px 20px 0 ${statusColor}30`,
        // borderColor: statusColor,
      }}
    >
      {sidebarShow && (
        <Sidebar>
          <TaskDetails task={task} closeSidebar={() => setSidebarShow(false)} project={project} />
        </Sidebar>
      )}
      <button
        className='font-bold flex hover:underline text-lg'
        onClick={(e) => {
          e.stopPropagation();
          setSidebarShow(true);
        }}
      >
        {task.title}
      </button>
      <p className='text-[15px] line-clamp-2'>{task.description}</p>
      {formattedDueDate && (
        <div className='flex items-center gap-2 italic text-base'>
          <CalendarOff size={16} />
          <p>{formattedDueDate}</p>
        </div>
      )}
    </div>
  );
}
