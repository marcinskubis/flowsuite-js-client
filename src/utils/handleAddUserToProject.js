import { mutate } from "swr";
import { URL } from "../config";

const handleAddUserToProject = async (user, projectId) => {
  const projectKey = `${URL}/api/project/${projectId}`;

  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      updatedProject.members = updatedProject.members.push(user);

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/project/${projectId}/assign`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
      }),
    });

    if (!response.ok) {
      mutate(projectKey);
      console.error("Failed to add user to the project.");
    } else {
      mutate(projectKey);
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error updating task:", error);
  }
};

export default handleAddUserToProject;
