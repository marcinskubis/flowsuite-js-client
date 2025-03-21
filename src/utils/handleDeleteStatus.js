import { mutate } from "swr";
import { URL } from "../config";

const handleDeleteStatus = async (projectId, statusId) => {
  const projectKey = `${URL}/api/project/${projectId}`;
  mutate(
    projectKey,
    async (projectData) => {
      if (!projectData) return;

      const updatedProjectData = JSON.parse(JSON.stringify(projectData));

      const status = updatedProjectData.statuses.find((s) => s._id === statusId);

      if (!status) {
        console.error("Status not found with the provided statusId");
        return updatedProjectData;
      }

      updatedProjectData.statuses = updatedProjectData.statuses.filter(
        (status) => status._id !== statusId
      );

      return updatedProjectData;
    },
    false
  );

  try {
    const response = await fetch(`${URL}/api/status/${statusId}`, {
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
      console.error("Failed to delete status:", errorData.message || "Unknown error");
    } else {
      mutate(projectKey);
    }
  } catch (error) {
    mutate(projectKey);
    console.error("Error deleting task:", error);
  }
};

export default handleDeleteStatus;
