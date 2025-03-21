import {
  addEdge,
  Background,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Controls,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React from "react";
import Button from "./Button";
import TaskNode from "./TaskNode";
import handleEditProject from "../utils/handleEditProject";
import SlideDownModal from "./SlideDownModal";
import CreateMilestoneForm from "./CreateMilestoneForm";
import GraphEdge from "./GraphEdge";
import { TriangleAlert } from "lucide-react";
import usePermissionStore from "../store/usePermissionStore";

const nodeTypes = {
  taskNode: TaskNode,
};

const edgeTypes = {
  graphEdge: GraphEdge,
};

export default function ReactFlowGraph({ project }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [rfInstance, setRfInstance] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const { setViewport } = useReactFlow();
  const { adminPermission, ownerPermission } = usePermissionStore();

  const removeNode = React.useCallback(
    (id) => {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
      setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== id && edge.target !== id));
    },
    [setNodes, setEdges]
  );

  React.useEffect(() => {
    if (project?.graph.length > 0) {
      const flow = JSON.parse(project?.graph);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(
          (flow.nodes || []).map((node) => ({
            ...node,
            data: {
              ...node.data,
              removeNode,
            },
          }))
        );
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    }
  }, []);

  const onConnect = React.useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "graphEdge",
            markerEnd: {
              type: MarkerType.Arrow,
              color: "#001b2e",
              strokeWidth: 2,
              width: 40,
              height: 15,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onSave = React.useCallback(async () => {
    if (rfInstance) {
      const flowString = JSON.stringify(rfInstance.toObject());
      if (adminPermission || ownerPermission) {
        handleEditProject(project?._id, project?.title, project?._description, flowString);
      }
    }
  }, [rfInstance]);

  const addTaskNode = (title, description, color) => {
    const id = crypto.randomUUID();

    const yOffset = 200;
    let maxY = 0;

    if (nodes.length > 0) {
      maxY = Math.max(...nodes.map((node) => node.position.y));
    }

    const newNode = {
      id,
      data: {
        id,
        title,
        description,
        removeNode,
        color: color !== "#ffffff" ? color : getRandomColor(),
      },
      type: "taskNode",
      position: {
        x: (Math.random() - 0.5) * 400,
        y: maxY + yOffset,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const isGraphChanged = rfInstance
    ? project?.graph !== JSON.stringify(rfInstance.toObject())
    : false;

  return (
    <div className='w-full h-full bg-white'>
      <SlideDownModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={"Create Milestone"}
      >
        <CreateMilestoneForm onSubmit={addTaskNode} onClose={() => setShowModal(false)} />
      </SlideDownModal>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        minZoom={0.3}
        maxZoom={10}
        style={{
          backgroundColor: "#E7ECEF",
        }}
      >
        <Panel position='right' className='flex flex-col gap-2 w-40 md:flex-row md:w-80'>
          {(adminPermission || ownerPermission) && (
            <>
              <Button style={"submit"} onClick={onSave} disabled={!isGraphChanged}>
                Save flow
              </Button>
              <Button
                style={"default"}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Add milestone
              </Button>
            </>
          )}
        </Panel>
        <Panel position='left'>
          {isGraphChanged && (adminPermission || ownerPermission) && (
            <div className='text-raspberry opacity-75 italic flex items-center gap-2'>
              <TriangleAlert />
              <p className=' text-nowrap'>Remember to save graph before leaving this page.</p>
            </div>
          )}
        </Panel>
        <Controls />
        <Background color='#001b2e' />
      </ReactFlow>
    </div>
  );
}
