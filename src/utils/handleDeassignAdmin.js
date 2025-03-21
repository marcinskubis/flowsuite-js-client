import { mutate } from "swr";
import { URL } from "../config";

const handleDeassignAdmin = async (user, projectId) => {
  const projectKey = `${URL}/api/project/${projectId}`;

  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      updatedProject.admins = updatedProject.admins.filter(
        (admin) => admin._id !== user._id
      );
      console.log(updatedProject);

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(
      `${URL}/api/project/${projectId}/deassignAdmin`,
      {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
        }),
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

export default handleDeassignAdmin;
