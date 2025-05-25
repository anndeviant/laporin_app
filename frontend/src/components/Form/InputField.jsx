const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  className = "border border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out",
  style = {},
  ...rest
}) => {
  return (
    <div className="py-2">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`block w-full rounded-md ${className} p-2`}
        style={{ backgroundColor: "#ffffff", ...style }}
        {...rest}
      />
    </div>
  );
};

export default InputField;