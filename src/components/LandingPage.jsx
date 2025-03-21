import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthSwitch from "./AuthSwitch";
import NavigationBar from "./NavigationBar";
import Logo from "./Logo";
import { URL } from "../config";

export default function LandingPage() {
  const navigate = useNavigate();
  React.useEffect(() => {
    fetch(`${URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/profile");
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-antiflash-white bg-cubes p-4 pt-24'>
      <NavigationBar className='fixed left-0 right-0 top-0 w-full bg-white shadow-md flex items-center h-24 p-6 justify-between rounded-bl-lg rounded-br-lg'>
        <Link to='/'>
          <Logo />
        </Link>
        <AuthSwitch />
      </NavigationBar>
      <Outlet />
    </div>
  );
}
