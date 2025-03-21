import { mutate } from "swr";
import { URL } from "../config";

const handleEditTask = async (
  projectId,
  statusId,
  taskId,
  title,
  description,
  startDate,
  dueDate,
  assignees
) => {
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

      const task = status.tasks && status.tasks.find((t) => t._id === taskId);

      if (!task) {
        console.error("Task not found with the provided taskId");
        return updatedProjectData;
      }

      task.title = title;
      task.description = description;
      task.assignees = assignees;
      task.startDate = startDate;
      task.endDate = dueDate;

      return updatedProjectData;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/task/${taskId}`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        assignees,
        startDate,
        endDate: dueDate,
      }),
    });

    if (!response.ok) {
      mutate(projectKey);
      console.error("Failed to update the project");
    } else {
      mutate(projectKey);
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error updating task:", error);
  }
};

export default handleEditTask;
