import SearchBar from "./TopBarRight/SearchBar";

export default function TopBarRight({ searchTerm, onSearchChange }) {
    return (
        <ul aria-label="top bar right" aria-orientation="horizontal" className="px-8 flex items-center">
            <SearchBar
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search something..."
            />
        </ul>
    );
}
