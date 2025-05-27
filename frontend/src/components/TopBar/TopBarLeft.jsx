import AddDropdown from "./TopBarLeft/AddDropdown";

const TopBarLeft = () => {
    const menuItems = [
        { label: 'Agency', href: '/admin/agency' },
        { label: 'Category', href: '/admin/category' },
    ];
    return (
        <ul
            aria-label="top bar left"
            aria-orientation="horizontal"
            className="flex items-center"
        >
            <li className="group relative">
                <AddDropdown items={menuItems} />
            </li>
        </ul>
    );
}

export default TopBarLeft;