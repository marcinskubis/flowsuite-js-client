import useDragAndDropStore from "../store/useDragAndDropStore";
import { useParams } from "react-router-dom";
import handleTaskMove from "../utils/handleTaskMove";

export default function DragDropIndicator({ indicatedIndex, indicatedStatus, highlight }) {
  const { draggedElement, setDraggedElement } = useDragAndDropStore();
  const { projectId } = useParams();
  return (
    <div
      className='bg-transparent w-full h-3 min-h-3 rounded-sm'
      style={{
        backgroundColor: highlight ? "rgb(30 41 59)" : "transparent",
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        event.target.style.backgroundColor = "rgb(30 41 59)";
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        event.target.style.backgroundColor = "transparent";
      }}
      onDrop={(event) => {
        event.preventDefault();
        handleTaskMove(
          draggedElement?.id,
          indicatedIndex,
          draggedElement?.status,
          indicatedStatus,
          projectId
        );
        event.target.style.backgroundColor = "transparent";
        setDraggedElement(null);
        event.stopPropagation();
      }}
    ></div>
  );
}
