const SidebarItem = ({ href, title, icon, active = false }) => {
  return (
    <li>
      <a
        href={href}
        title={title}
        className={`h-16 px-6 flex items-center w-full hover:text-white ${
          active ? "text-white bg-teal-700" : ""
        }`}
      >
        <i className="mx-auto">{icon}</i>
      </a>
    </li>
  );
};

export default SidebarItem;
