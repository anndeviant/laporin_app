const SelectField = ({ id,
    name,
    options,
    label,
    className = "border border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out focus:ring-opacity-50",
    style = {},
    ...rest
}) => {
    return (
        <div className="py-2">
            <select
                id={id}
                name={name}
                className={`block w-full rounded-md ${className} p-2`}
                style={{ backgroundColor: "#ffffff", ...style }}
                {...rest}
            >
                <option value="">{label}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectField