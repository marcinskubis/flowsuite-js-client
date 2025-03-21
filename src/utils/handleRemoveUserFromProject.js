import { mutate } from "swr";
import { URL } from "../config";

const handleRemoveUserFromProject = async (userId, projectId) => {
  const projectKey = `${URL}/api/project/${projectId}`;

  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      updatedProject.members = updatedProject.members.filter(
        (user) => user._id !== userId
      );
      console.log(updatedProject);

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/project/${projectId}/deassign`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
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

export default handleRemoveUserFromProject;
