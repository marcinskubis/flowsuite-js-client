import { Trash2 } from "lucide-react";

export default function DeleteButton({ children, ...rest }) {
  return (
    <button
      className="relative w-auto rounded-md bg-raspberry p-3 pl-10 text-white overflow-hidden pr-[6.5rem] group"
      {...rest}
    >
      <p>{children}</p>
      <div
        className="absolute top-0 bottom-0 right-0 w-16 flex items-center justify-center border-l border-white bg-[#a72541]
                transition-all group-hover:w-full group-hover:border-none"
      >
        <Trash2 />
      </div>
    </button>
  );
}
