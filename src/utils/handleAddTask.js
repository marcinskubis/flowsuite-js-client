import { mutate } from "swr";
import { URL } from "../config";

const handleAddTask = async (
  title,
  description,
  status,
  project,
  assignees,
  startDate,
  endDate
) => {
  try {
    const response = await fetch(`${URL}/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        project,
        assignees,
        startDate,
        endDate,
      }),
      credentials: "include",
      mode: "cors",
    });

    if (response.ok) {
      mutate(`${URL}/api/project/${project}`);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default handleAddTask;
