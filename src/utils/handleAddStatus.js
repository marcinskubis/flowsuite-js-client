import { mutate } from "swr";
import { URL } from "../config";

const handleAddStatus = async (name, description, color, projectId) => {
  try {
    const response = await fetch(`${URL}/api/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        color,
        project: projectId,
      }),
      credentials: "include",
      mode: "cors",
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      // trigger swr revalidation to refresh the project object
      mutate(`${URL}/api/project/${projectId}`);
    } else {
      // handle non ok res
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default handleAddStatus;
