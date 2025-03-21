import { Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X } from "lucide-react";
import usePermissionStore from "../store/usePermissionStore";

function TaskNode({ data, isConnectable }) {
  const { adminPermission, ownerPermission } = usePermissionStore();
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          zIndex: 10,
          borderRadius: "5px",
          width: "50px",
          height: "20px",
          top: "8px",
        }}
      />
      <div
        className='bg-white p-6 rounded-lg border relative group w-80 flex flex-col items-center gap-4'
        style={{
          boxShadow: `0 2px 5px 2px ${data.color}, 0 3px 15px 0 ${data.color}`,
        }}
      >
        <p className='text-2xl font-bold text-oxford-blue'>{data.title}</p>
        <p className='text-lg'>{data.description}</p>
        {(adminPermission || ownerPermission) && (
          <button
            onClick={() => data.removeNode(data.id)}
            className='absolute hidden group-hover:flex items-center justify-center -top-3 -right-3 bg-raspberry rounded-[50%] p-[1px] origin-bottom-left transition-all hover:scale-105'
          >
            <X color='#FFFFFF' size={26} strokeWidth={2.5} />
          </button>
        )}
      </div>
      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
        style={{
          zIndex: 10,
          borderRadius: "3px",
          borderWidth: "0px",
          height: "10px",
          width: "30px",
        }}
      />
    </>
  );
}

export default TaskNode;
