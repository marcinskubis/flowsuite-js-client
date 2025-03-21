import { X } from "lucide-react";

export default function CloseButton({ close }) {
  return (
    <button onClick={close} className='p-1 rounded-[50%] hover:bg-gray-300' type='button'>
      <X color='#001b2e' />
    </button>
  );
}
