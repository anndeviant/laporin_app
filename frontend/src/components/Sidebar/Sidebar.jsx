import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

const Sidebar = ({ activeItem }) => {
  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-none flex flex-col items-center text-center bg-[#03363d] text-gray-400 border-r"
    >
      <SidebarLogo
        src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/leaves.png"
        className="h-6 w-6"
      />

      <ul>
        <SidebarItem
          href="/admin/dashboard"
          title="Dashboard"
          active={activeItem === "dashboard"}
          icon={
            <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
            </svg>
          }
        />
        <SidebarItem
          href="/admin/category"
          title="Category"
          active={activeItem === "category"}
          icon={
            <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
              <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zM14.75 15h-5.5l-2.25-3h-4.666l4.266-7h10.82l4.249 7h-4.669l-2.25 3z" />
            </svg>
          }
        />
        <SidebarItem
          href="/admin/agency"
          title="Agency"
          active={activeItem === "agency"}
          icon={
            <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
              <path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zM12 22.616c-4.072-1.793-6.593-7.376-6.593-9.821h13.186c0 2.423-2.6 8.006-6.593 9.821z" />
            </svg>
          }
        />
        <SidebarItem
          href="/admin/profile"
          title="Profile"
          active={activeItem === "profile"}
          icon={
            <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
              <path d="M12 2c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm0 14c2.021 0 3.301.771 3.783 1.445-.683.26-1.969.555-3.783.555s-3.1-.295-3.783-.555c.482-.674 1.762-1.445 3.783-1.445zm0-12c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm9 17v-1a6 6 0 00-9-5.197A6 6 0 003 21v1h18z" />
            </svg>
          }
        />
      </ul>

      <SidebarLogo
        src="https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/chi.png"
        className="h-8 w-10"
        style={{ filter: "invert(85%)" }}
      />
    </nav>
  );
};

export default Sidebar;
