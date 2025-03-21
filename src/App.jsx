import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./components/ProjectPage";
import ProfilePage from "./components/ProfilePage";
import { ReactFlowProvider } from "@xyflow/react";
import LandingPageContent from "./components/LandingPageContent";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <ErrorPage />,
      children: [
        { path: "sign-in", element: <SignInForm /> },
        { path: "sign-up", element: <SignUpForm /> },
        { path: "", element: <LandingPageContent /> },
      ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/project/:projectId",
      element: (
        <ReactFlowProvider>
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        </ReactFlowProvider>
      ),
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
