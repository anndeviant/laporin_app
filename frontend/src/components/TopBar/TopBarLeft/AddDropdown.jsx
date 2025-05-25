const AddDropdown = ({ items }) => {
    return (
        <div className="group relative">
            <button
                aria-controls="add"
                aria-expanded="false"
                aria-haspopup="listbox"
                className="flex items-center h-full px-4 text-sm"
            >
                <i>
                    <svg className="fill-current w-3 h-3 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z" />
                    </svg>
                </i>
                <span className="ml-2">Add</span>
            </button>

            <span className="absolute pt-6 ps-1 hidden group-hover:block">
                <ul
                    id="add"
                    role="listbox"
                    className="outline-none py-2 bg-white border rounded-md w-screen max-w-md w-dropdown-large shadow-lg leading-relaxed"
                >
                    <li role="separator" className="mb-2">
                        <label className="block px-4 py-3 font-semibold">New</label>
                        <hr />
                    </li>

                    {items.map(({ label, href }) => (
                        <li
                            key={label}
                            role="option"
                            className="px-6 py-1 my-1 focus:outline-none focus:bg-blue-100 hover:bg-blue-100 cursor-pointer"
                        >
                            <a href={href}>{label}</a>
                        </li>
                    ))}
                </ul>
            </span>
        </div>
    )
}

export default AddDropdown;

