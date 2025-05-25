const SearchBar = ({ value, onChange, placeholder = "" }) => {
  return (
    <li className="relative">
      <input
        title="Search Bar"
        aria-label="search bar"
        role="search"
        className="pr-8 pl-4 py-2 rounded-md border border-black w-64 focus:placeholder-gray-500"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <i className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-3">
        <svg className="fill-current w-4 h-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
        </svg>
      </i>
    </li>
  );
};

export default SearchBar;