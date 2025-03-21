import { mutate } from "swr";
import { URL } from "../config";

const handleTaskMove = async (
  taskId,
  newIndex,
  currentStatusId,
  newStatusId,
  projectId
) => {
  const projectKey = `${URL}/api/project/${projectId}`;

  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      const currentStatus = updatedProject.statuses.find(
        (status) => status._id === currentStatusId
      );
      const newStatus = updatedProject.statuses.find(
        (status) => status._id === newStatusId
      );

      if (!currentStatus || !newStatus) return projectData;

      const taskIndex = currentStatus.tasks.findIndex(
        (task) => task._id === taskId
      );
      if (taskIndex === -1) return projectData;

      const [movedTask] = currentStatus.tasks.splice(taskIndex, 1);

      movedTask.status = newStatusId;

      newStatus.tasks.splice(newIndex, 0, movedTask);

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(
      `${URL}/api/project/${projectId}/tasks/${taskId}/move`,
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newIndex, currentStatusId, newStatusId }),
      }
    );

    if (!response.ok) {
      mutate(projectKey);
      console.error("Failed to update the task order");
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error updating task:", error);
  }
};

export default handleTaskMove;
