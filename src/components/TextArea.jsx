import React from "react";

export default function TextArea({
  errors,
  name,
  register,
  registerContent,
  label,
  id,
  limit,
  watch,
  ...rest
}) {
  const textAreaRef = React.useRef(null);
  const value = watch(name) ? watch(name) : "";

  const { onChange: registerOnChange, onBlur, ref } = register(name, { ...registerContent });

  const handleChange = (e) => {
    registerOnChange(e);
  };

  React.useEffect(() => {
    if (!textAreaRef.current) return;
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = 0;
    textAreaRef.current.style.height = scrollHeight + "px";
  }, [value]);
  return (
    <div
      className='flex flex-col items-start gap-2 w-full
                has-[:disabled]:opacity-60 has-[:disabled]:select-none has-[:disabled]:pointer-events-none'
    >
      <div className='flex items-center w-full justify-between'>
        <label htmlFor={id} className='text-gray-600'>
          {label}
        </label>
        {limit && (
          <p style={{ color: value?.length > limit && "#ce2d4f" }}>
            {value.length}/<b>{limit}</b>
          </p>
        )}
      </div>
      <textarea
        className='bg-white border w-full border-timberwolf rounded-md p-2
                        focus:outline-picton-blue hover:border-slate-900 disabled:select-none overflow-hidden resize-none h-auto'
        style={{
          borderColor: errors[name] && "#ce2d4fff",
        }}
        rows={1}
        name={name}
        id={id}
        ref={(e) => {
          ref(e);
          textAreaRef.current = e;
        }}
        onChange={handleChange}
        onBlur={onBlur}
        {...rest}
      />
      {errors[name] && <p className='text-red-500 text-sm'>{errors[name].message}</p>}
    </div>
  );
}
