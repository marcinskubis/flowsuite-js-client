import { createPortal } from "react-dom";

export default function Sidebar({ children }) {
  return createPortal(
    <div className='fixed right-0 bottom-0 top-24 backdrop-blur-sm backdrop-brightness-75 flex items-center justify-end left-0 z-20'>
      <div
        className='bg-white p-8 z-1 w-full rounded-xl overflow-auto max-h-full
                md:h-[90%] md:max-h-[55rem] md:min-w-96 md:w-[55%] md:max-w-[600px] md:rounded-none md:rounded-bl-lg md:rounded-tl-lg'
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
