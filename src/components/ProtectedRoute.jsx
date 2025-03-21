import React from "react";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { URL } from "../config";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
  const { setUserId, clearUserId } = useUserStore();

  React.useEffect(() => {
    fetch(`${URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json(); // Parse the response as JSON if status is OK
        } else {
          setIsAuthenticated(false);
          await clearUserId();
          throw new Error("Authentication failed");
        }
      })
      .then(async (data) => {
        // Assuming the response includes userId in the data object
        if (data.userId) {
          await setUserId(data.userId); // Update userId in Zustand store
          setIsAuthenticated(true);
        } else {
          throw new Error("User ID not found");
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <PageLoader />;
  }

  return isAuthenticated ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
