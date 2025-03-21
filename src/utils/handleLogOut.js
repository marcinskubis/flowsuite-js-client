import { URL } from "../config";

export default async function handleLogOut(onSuccess) {
  try {
    const response = await fetch(`${URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    if (response.ok) {
      onSuccess();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
