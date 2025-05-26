const SelectField = ({ id,
    name,
    options,
    label,
    className = "border border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out focus:ring-opacity-50",
    style = {},
    sub = null,
    ...rest
}) => {
    return (
        <div className="py-2">
            {sub ? (<p className="font-bold text-black py-2">{sub} :</p>) : null}
            <select
                id={id}
                name={name}
                className={`block w-full rounded-md ${className} p-2`}
                style={{ backgroundColor: "#ffffff", ...style }}
                {...rest}
            >
                {options.map((opt, i) => {
                    const value = typeof opt === "object" ? opt.value : opt;
                    const label = typeof opt === "object" ? opt.label : opt;
                    return (
                        <option key={i} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default SelectField