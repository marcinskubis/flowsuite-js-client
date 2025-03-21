import ReactFocusLock from "react-focus-lock";
import Button from "./Button";

export default function ConfirmationForm({ label, onSubmition, onCancel }) {
  return (
    <ReactFocusLock>
      <div className='fixed inset-0 bg-oxford-blue-opacity z-20 flex items-center justify-center overflow-hidden'>
        <div className='bg-white rounded-md flex flex-col gap-10 p-10 shadow-md w-96'>
          <p className='text-2xl font-bold'>{label}</p>
          <div className='flex items-center gap-4'>
            <Button style={"cancel"} onClick={onCancel}>
              Cancel
            </Button>
            <Button style={"submit"} onClick={onSubmition}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
