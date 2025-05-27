import SearchBar from "./TopBarRight/SearchBar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils";
import axios from "axios";
import { useState } from "react";

export default function TopBarRight({ searchTerm, onSearchChange }) {
    const navigate = useNavigate();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("accessToken");
            await axios.delete(`${BASE_URL}/admin/logout`)
            navigate("/admin");
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            showToast("Logout failed. Please try again.", "error");
        }
    };

    const confirmLogout = () => {
        setShowLogoutPopup(false);
        handleLogout();
    };

    const cancelLogout = () => {
        setShowLogoutPopup(false);
    };

    return (
        <>
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div className={`px-6 py-4 rounded-lg shadow-lg text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                        <div className="flex items-center gap-2">
                            {toast.type === "error" && (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            )}
                            <span className="font-medium">{toast.message}</span>
                        </div>
                    </div>
                </div>
            )}

            <ul aria-label="top bar right" className="px-8 flex items-center gap-4">
                <SearchBar
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search something..."
                />
                <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            </ul>

            {/* Logout Confirmation Popup */}
            {showLogoutPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Konfirmasi Logout
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Apakah Anda yakin ingin keluar dari sistem?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
