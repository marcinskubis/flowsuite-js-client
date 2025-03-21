import { getBezierPath, useReactFlow, EdgeLabelRenderer, BaseEdge } from "@xyflow/react";
import { X } from "lucide-react";
import usePermissionStore from "../store/usePermissionStore";

function GraphEdge({ id, sourceX, sourceY, targetX, targetY, style = {}, markerEnd, selected }) {
  const { setEdges } = useReactFlow();

  const { adminPermission, ownerPermission } = usePermissionStore();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleDelete = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {selected && (adminPermission || ownerPermission) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className='nodrag nopan'
          >
            <button
              className='edgebutton bg-raspberry rounded-full flex items-center justify-center p-1'
              onClick={handleDelete}
            >
              <X color='#ffffff' />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default GraphEdge;
