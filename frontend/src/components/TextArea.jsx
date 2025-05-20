const TextArea = ({
  id,
  name,
  placeholder,
  className = "border border-sky-500 focus:outline-none focus:border-2 focus:border-sky-500 focus:shadow-[0_0_5px_rgba(0,191,255,10)] hover:shadow-[0_0_5px_rgba(0,191,255,10)] transition-shadow ease-in-out focus:ring-opacity-50",
  style = {},
  ...rest
}) => {
  return (
    <textarea
      id={id}
      name={name}
      rows="3"
      placeholder={placeholder}
      className={`block w-full h-48 rounded-md ${className} p-2`}
      style={{ backgroundColor: "#ffffff", ...style }}
      {...rest}
    />
  );
}

export default TextArea;