import { mutate } from "swr";
import { URL } from "../config";

const handleEditStatus = async (
  name,
  description,
  color,
  projectId,
  statusId
) => {
  const projectKey = `${URL}/api/project/${projectId}`;
  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      const statusIndex = updatedProject.statuses.findIndex(
        (status) => status._id === statusId
      );

      if (statusIndex !== -1) {
        updatedProject.statuses[statusIndex].name = name;
        updatedProject.statuses[statusIndex].description = description;
        updatedProject.statuses[statusIndex].color = color;
      }

      console.log(updatedProject);

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/status/${statusId}`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        color,
        project: projectId,
      }),
    });

    if (!response.ok) {
      mutate(projectKey);
      console.error("Failed to update the task order");
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error updating task:", error);
  }
};

export default handleEditStatus;
