const TextArea = ({id, name, placeholder}) => {
    return (
    <textarea
      id={id}
      name={name}
      rows="3"
      placeholder={placeholder}
      className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
      style={{ backgroundColor: "#f6f6f6" }}
    />
  );
}

export default TextArea;