import SearchBar from "./TopBarRight/SearchBar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils";
import axios from "axios";

export default function TopBarRight({ searchTerm, onSearchChange }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("accessToken");
        await axios.delete(`${BASE_URL}/admin/logout`)
        navigate("/admin");
    };

    return (
        <ul aria-label="top bar right" aria-orientation="horizontal" className="px-8 flex items-center gap-4">
            <SearchBar
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search something..."
            />
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
                Logout
            </button>
        </ul>
    );
}
