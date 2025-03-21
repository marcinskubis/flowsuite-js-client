import React from "react";
import Task from "./Task";
import { motion } from "framer-motion";
import DragDropIndicator from "./DragDropIndicator";
import useDragAndDropStore from "../store/useDragAndDropStore";
import handleTaskMove from "../utils/handleTaskMove";
import { CalendarArrowDown, CalendarArrowUp, CalendarDays, ListPlus } from "lucide-react";
import Divider from "./Divider";
import Sidebar from "./Sidebar";
import StatusDetails from "./StatusDetails";
import CreateTaskForm from "./CreateTaskForm";
import SlideDownModal from "./SlideDownModal";
import useFilterStore from "../store/useFIlterStore";
import useUserStore from "../store/useUserStore";

const sortStatuses = ["none", "asc", "desc"];

function StatusColumn({ status, project }) {
  const [tasks, setTasks] = React.useState(status?.tasks);
  const [tasksSorted, setTasksSorted] = React.useState(status?.tasks);
  const [sortOrder, setSortOrder] = React.useState("none");

  const [highlight, setHighlight] = React.useState(false);
  const [highlightedIndicator, setHighlightedIndicator] = React.useState(null);
  const [showStatusInfo, setShowStatusInfo] = React.useState(false);
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  const { draggedElement, setDraggedElement } = useDragAndDropStore();
  const { filterOwnTasks } = useFilterStore();
  const { userId } = useUserStore();

  const id = React.useId();

  React.useEffect(() => {
    setTasks(status?.tasks);
  }, [status]);

  React.useEffect(() => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortOrder === "asc") {
        if (!("endDate" in a)) return 1;
        if (!("endDate" in b)) return -1;
        return new Date(a.endDate) - new Date(b.endDate);
      }
      if (sortOrder === "desc") {
        if (!("endDate" in a)) return 1;
        if (!("endDate" in b)) return -1;
        return new Date(b.endDate) - new Date(a.endDate);
      }
      return 0;
    });
    setTasksSorted(sortedTasks);
  }, [sortOrder]);

  const tasksToRender = React.useMemo(() => {
    let filteredTasks = sortOrder === "none" ? tasks : tasksSorted;

    if (filterOwnTasks) {
      filteredTasks = filteredTasks.filter((task) =>
        task.assignees.some((assignee) => assignee._id === userId)
      );
    }

    return filteredTasks;
  }, [tasks, tasksSorted, sortOrder, filterOwnTasks, userId]);

  function toggleSortOrder() {
    const nextSortOrder = sortStatuses[(sortStatuses.indexOf(sortOrder) + 1) % sortStatuses.length];
    setSortOrder(nextSortOrder);
  }

  function getSortIcon() {
    if (sortOrder === "asc") return <CalendarArrowUp />;
    if (sortOrder === "desc") return <CalendarArrowDown />;
    return <CalendarDays />;
  }

  const { name, color, _id: statusId } = status;
  return (
    <div
      className='h-full max-w-[300px] p-2 min-w-[300px] rounded-xl flex flex-col shadow-md gap-2 relative'
      style={{
        backgroundColor: "white",
        borderTop: `.4rem solid ${color}`,
      }}
    >
      {showStatusInfo && (
        <Sidebar close={() => setShowStatusInfo(false)}>
          <StatusDetails
            closeSidebar={() => setShowStatusInfo(false)}
            status={status}
            project={project}
          />
        </Sidebar>
      )}
      <div className='flex items-center justify-between'>
        <button
          className='font-bold text-lg self-start decoration-2 hover:underline'
          onClick={() => setShowStatusInfo(true)}
        >
          {name}
        </button>
        <button onClick={toggleSortOrder}>{getSortIcon()}</button>
      </div>
      <Divider />
      <motion.div layoutScroll className='flex flex-col h-full overflow-y-auto'>
        <DragDropIndicator
          key={id}
          indicatedIndex={0}
          indicatedStatus={statusId}
          highlight={(tasks.length === 0 && highlight) || highlightedIndicator === 0}
        />
        {tasksToRender.map((task, index) => {
          return (
            <React.Fragment key={`${id}-${index}`}>
              <Task
                key={`${id}-${task.id}`}
                task={task}
                status={statusId}
                highlightIndicator={setHighlightedIndicator}
                listIndex={index}
                project={project}
                statusColor={color}
              />
              <DragDropIndicator
                key={`${id}-${index}`}
                indicatedIndex={index + 1}
                indicatedStatus={statusId}
                highlight={
                  (highlight ? index === tasks.length - 1 && true : false) ||
                  highlightedIndicator === index + 1
                }
              />
            </React.Fragment>
          );
        })}
        <div
          className='grow min-h-[10%]'
          onDragEnter={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            setHighlight(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setHighlight(true);
            event.dataTransfer.dropEffect = "move";
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setHighlight(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setHighlight(false);
            setDraggedElement(null);
            handleTaskMove(
              draggedElement.id,
              tasks.length,
              draggedElement.status,
              statusId,
              project._id
            );
          }}
        ></div>
      </motion.div>
      <Divider />
      <button
        className='flex items-center justify-start self-start gap-2'
        onClick={() => setShowTaskForm(true)}
        type='button'
      >
        <ListPlus color='#001b2e' />
        <p className='text-oxford-blue font-bold'>Add Task</p>
      </button>
      <SlideDownModal show={showTaskForm} onClose={() => setShowTaskForm(false)} title={"New Task"}>
        <CreateTaskForm onClose={() => setShowTaskForm(false)} status={status} project={project} />
      </SlideDownModal>
    </div>
  );
}

export default StatusColumn;
