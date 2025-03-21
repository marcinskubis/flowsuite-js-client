export default function ColorPicker({
    errors,
    name,
    register,
    registerContent,
    label,
    id,
    defaultValue,
    ...rest
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <label htmlFor={id} className="text-gray-600">
                    {label}
                </label>
                <input
                    className="bg-white border border-timberwolf
                            focus:outline-picton-blue hover:border-slate-900 disabled:select-none"
                    style={{
                        borderColor: errors[name] && "#ce2d4fff",
                    }}
                    name={name}
                    id={id}
                    type='color'
                    defaultValue={defaultValue}
                    {...register(name, { value: defaultValue ? defaultValue : '#ffffff' })}
                    {...rest}
                />
            </div>
            {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name].message}</p>
            )}
        </div>
    );
}