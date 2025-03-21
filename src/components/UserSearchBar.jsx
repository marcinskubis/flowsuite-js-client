import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserPlus, X } from "lucide-react";
import handleAddUserToProject from "../utils/handleAddUserToProject";
import { Tooltip } from "react-tooltip";
import { URL } from "../config";

export default function UserSearchBar({ close, projectId, limit = 10 }) {
  const [searchResult, setSearchResult] = React.useState(null);
  async function handleSearch(event) {
    event.preventDefault();
    try {
      if (event.target.value.length > 0) {
        const response = await fetch(
          `${URL}/api/user/search?` +
            new URLSearchParams({
              email: event.target.value,
              projectId: projectId,
              limit: limit,
            }).toString(),
          {
            method: "GET",
            credentials: "include",
            mode: "cors",
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          setSearchResult(responseData);
        }
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='w-full relative'>
      <AnimatePresence>
        {searchResult && searchResult.length > 0 && (
          <motion.ul
            className='absolute bottom-full max-h-64 w-11/12 left-1/2 -translate-x-1/2 overflow-auto flex flex-col gap-1 bg-antiflash-white p-2 rounded-md shadow-md shadow-picton-blue border-2 border-picton-blue'
            initial={{
              height: "0px",
              overflowX: "hidden",
            }}
            animate={{
              height: "auto",
              overflowX: "auto",
            }}
            exit={{
              height: "0px",
              overflowX: "hidden",
            }}
          >
            {searchResult.map((result, index) => {
              return (
                <li
                  key={index}
                  className='flex items-center gap-2 pt-1 pr-3 pb-1 pl-3 bg-white rounded-md'
                  onClick={() => {}}
                >
                  <img
                    src={result?.avatarUrl}
                    alt=''
                    referrerPolicy='no-referrer'
                    className='rounded-[50%] w-8 h-8'
                  />
                  <div className='flex flex-col gap-1 max-w-[60%]'>
                    <p className='text-oxford-blue truncate'>{result?.username}</p>
                    <p className='text-slate-600 text-sm truncate'>{result?.email}</p>
                  </div>
                  <button
                    className='ml-auto'
                    onClick={() => {
                      handleAddUserToProject(result, projectId);
                      setSearchResult(null);
                    }}
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content='Add User to project'
                  >
                    <UserPlus />
                  </button>
                  <Tooltip
                    id='my-tooltip'
                    style={{
                      backgroundColor: "#001b2e",
                      borderRadius: ".5rem",
                    }}
                  />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      <div className='relative'>
        <input
          type='text'
          className='bg-white border w-full border-timberwolf rounded-md p-2 focus:outline-picton-blue hover:border-slate-900'
          onChange={(event) => handleSearch(event)}
          autoFocus={true}
        />
        <button className='absolute right-2 top-1/2 -translate-y-1/2' onClick={close}>
          <X />
        </button>
      </div>
    </div>
  );
}
