import { mutate } from "swr";
import { URL } from "../config";

const handleDeleteProject = async (projectId, userId, success) => {
  try {
    const response = await fetch(`${URL}/api/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    if (response.ok) {
      mutate(`${URL}/api/user/${userId}`);
      success();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default handleDeleteProject;
