import { mutate } from "swr";
import { URL } from "../config";

const handleEditProject = async (projectId, title, description, graph) => {
  const projectKey = `${URL}/api/project/${projectId}`;

  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProject = JSON.parse(JSON.stringify(projectData));

      updatedProject.title = title;
      updatedProject.description = description;
      updatedProject.graph = graph;

      return updatedProject;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/project/${projectId}`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        graph,
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

export default handleEditProject;
