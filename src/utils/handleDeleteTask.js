import { mutate } from "swr";
import { URL } from "../config";

const handleDeleteTask = async (projectId, statusId, taskId) => {
  const projectKey = `${URL}/api/project/${projectId}`;
  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProjectData = JSON.parse(JSON.stringify(projectData));

      const status = updatedProjectData.statuses.find(
        (s) => s._id === statusId
      );

      if (!status) {
        console.error("Status not found with the provided statusId");
        return updatedProjectData;
      }

      status.tasks = status.tasks.filter((task) => task._id !== taskId);

      return updatedProjectData;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/task/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project: projectId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      mutate(projectKey);
      console.error(
        "Failed to delete task:",
        errorData.message || "Unknown error"
      );
    } else {
      mutate(projectKey);
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error deleting task:", error);
  }
};

export default handleDeleteTask;
