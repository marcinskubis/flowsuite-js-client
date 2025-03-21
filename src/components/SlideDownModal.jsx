import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import CloseButton from "./CloseButton";
import ReactFocusLock from "react-focus-lock";

export default function SlideDownModal({ show, onClose, children, title }) {
  return createPortal(
    <AnimatePresence>
      {show ? (
        <ReactFocusLock>
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 inset-0 w-full h-full backdrop-blur-md z-50 flex items-center justify-center overflow-hidden"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              initial={{
                translateY: "-100vh",
              }}
              animate={{
                translateY: "none",
              }}
              exit={{
                translateY: "-100vh",
                left: "50%",
              }}
              className="bg-white rounded-md flex flex-col gap-10 p-10 shadow-md w-96"
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl text-oxford-blue font-bold">{title}</p>
                <div className="self-end">
                  <CloseButton close={onClose} />
                </div>
              </div>
              {children}
            </motion.div>
          </motion.div>
        </ReactFocusLock>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
