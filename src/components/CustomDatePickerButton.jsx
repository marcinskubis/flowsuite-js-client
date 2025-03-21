import React from "react";

const CustomDatePickerButton = React.forwardRef(function input(
  { value, onClick, icon, placeholder },
  ref
) {
  return (
    <button
      className='flex items-center w-full gap-2 border border-timberwolf rounded-md p-2 hover:border-oxford-blue'
      type='button'
      onClick={onClick}
      ref={ref}
    >
      {icon}
      {value ? value : <p className='text-md text-gray-400 ml-auto mr-auto'>{placeholder}</p>}
    </button>
  );
});

export default CustomDatePickerButton;
