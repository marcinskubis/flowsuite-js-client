import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
export default function AuthSwitch() {
  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const id = React.useId();
  return (
    <div className='flex items-center gap-1 border border-timberwolf rounded-md pt-1 pr-2 pb-1 pl-2 md:pt-2 md:pr-4 md:pb-2 md:pl-4 text-[15px] md:text-base md:gap-2'>
      <div className='relative flex items-center justify-center rounded-md p-2'>
        {(path === "sign-in" || path === "") && (
          <motion.div
            layoutId={id}
            className='absolute inset-0 bg-gradient-to-br from-picton-blue to-blue-700 rounded-md'
          ></motion.div>
        )}
        <Link
          to='/sign-in'
          className='relative z-20'
          style={{
            color: (path === "sign-in" || path === "") && "white",
            fontWeight: path === "" && 700,
          }}
        >
          Sign In
        </Link>
      </div>
      <div className='relative flex items-center justify-center rounded-md p-2'>
        {path === "sign-up" && (
          <motion.div
            layoutId={id}
            className='absolute inset-0 bg-gradient-to-br from-picton-blue to-blue-700 rounded-md'
          ></motion.div>
        )}
        <Link
          to='/sign-up'
          className='relative z-20'
          style={{ color: path === "sign-up" && "white" }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
