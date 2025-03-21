import { mutate } from "swr";
import { URL } from "../config";

const handleAddProject = async (projectTitle, projectDescription, userId) => {
  try {
    const response = await fetch(`${URL}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: projectTitle,
        description: projectDescription && projectDescription,
      }),
      credentials: "include",
      mode: "cors",
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      mutate(`${URL}/api/user/${userId}`);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default handleAddProject;
