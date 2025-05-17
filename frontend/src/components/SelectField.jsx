const SelectField = ({ id, name, options, label }) => {
    return (
        <div className="p-2">
            <select
                id={id}
                name={name}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
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