import { mutate } from "swr";
import { URL } from "../config";

const handleEditUser = async (username, userId) => {
  console.log(username, userId);

  try {
    const response = await fetch(`${URL}/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
      credentials: "include",
      mode: "cors",
    });

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

export default handleEditUser;
