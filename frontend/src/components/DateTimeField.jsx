const DateTimeField = ({ id, label }) => {
  return (
    <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
      <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z" />
        </svg>
        <span className="ml-2">{label}</span>
      </span>
      <input
        type="datetime-local"
        id={id}
        name={id}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        style={{ backgroundColor: "#f6f6f6" }}
      />
    </div>
  );
}

export default DateTimeField