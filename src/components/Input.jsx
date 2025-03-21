import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";

export default function Input({
  errors,
  name,
  register,
  registerContent,
  label,
  id,
  type,
  limit,
  defaultValue,
  ...rest
}) {
  const [value, setValue] = React.useState(defaultValue ? defaultValue : "");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const {
    onChange: registerOnChange,
    onBlur,
    ref,
  } = register(name, { ...registerContent, value: defaultValue ? defaultValue : "" });

  const handleChange = (e) => {
    registerOnChange(e);
    setValue(e.target.value);
  };
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
          <p style={{ color: value.length > limit && "#ce2d4f" }}>
            {value.length}/<b>{limit}</b>
          </p>
        )}
      </div>

      <div className='relative w-full'>
        <input
          className='bg-white border w-full border-timberwolf rounded-md p-2
                    focus:outline-picton-blue hover:border-slate-900 disabled:select-none'
          style={{
            borderColor: errors[name] && "#ce2d4fff",
          }}
          name={name}
          id={id}
          type={type === "password" ? (passwordVisible ? "text" : "password") : undefined}
          ref={ref}
          onChange={handleChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          {...rest}
        />
        {type === "password" && (
          <button
            type='button'
            className='absolute right-2 top-[50%] translate-y-[-50%]'
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {errors[name] && <p className='text-red-500 text-sm'>{errors[name].message}</p>}
    </div>
  );
}
