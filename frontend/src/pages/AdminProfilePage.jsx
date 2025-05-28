import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProfilePage = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmEmail, setDeleteConfirmEmail] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/admin/profile`);
            setProfile(response.data.data);
            setFormData({
                name: response.data.data.name,
                email: response.data.data.email,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            showNotification('error', 'Gagal memuat profil');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            showNotification('error', 'Konfirmasi password tidak cocok');
            return;
        }

        if (formData.newPassword && !formData.currentPassword) {
            showNotification('error', 'Password saat ini diperlukan untuk mengubah password');
            return;
        }

        try {
            const updateData = {
                name: formData.name,
                email: formData.email
            };

            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            await axiosInstance.patch(`${BASE_URL}/admin/profile`, updateData);
            showNotification('success', 'Profil berhasil diperbarui');
            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            showNotification('error', error.response?.data?.message || 'Gagal memperbarui profil');
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmEmail !== profile.email) {
            showNotification('error', 'Email konfirmasi tidak cocok');
            return;
        }

        try {
            await axiosInstance.delete(`${BASE_URL}/admin/users/${profile.id}`);

            // Close the delete modal first
            setShowDeleteModal(false);
            setDeleteConfirmEmail("");

            // Show success notification
            showNotification('success', 'Akun berhasil dihapus! Mengalihkan...');

            // Clear token from localStorage
            localStorage.removeItem('accessToken');

            // Call logout API to clear server session
            try {
                await axios.delete(`${BASE_URL}/admin/logout`);
            } catch (logoutError) {
                console.log('Logout API error (can be ignored):', logoutError);
            }

            // Redirect to admin login after 2 seconds
            setTimeout(() => {
                navigate('/admin');
            }, 2000);

        } catch (error) {
            showNotification('error', error.response?.data?.message || 'Gagal menghapus akun');
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
                <Sidebar activeItem="profile" />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
            <Sidebar activeItem="profile" />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
                    <h1 className="font-semibold text-lg">Admin Profile</h1>
                </header>

                {/* Notification */}
                {notification && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                        {notification.message}
                    </div>
                )}

                <div className="overflow-auto flex-1 p-6 bg-gray-50">
                    <div className="max-w-2xl mx-auto">
                        {/* Profile Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Profil Admin</h2>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit Profil
                                    </button>
                                )}
                            </div>

                            {!isEditing ? (
                                // View Mode
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <div className="p-3 bg-gray-100 rounded-lg">
                                            {profile.username}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Lengkap
                                        </label>
                                        <div className="p-3 bg-gray-100 rounded-lg">
                                            {profile.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <div className="p-3 bg-gray-100 rounded-lg">
                                            {profile.email}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Edit Mode
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <div className="p-3 bg-gray-100 rounded-lg text-gray-500">
                                            {profile.username} (tidak dapat diubah)
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="text-lg font-medium text-gray-800 mb-4">Ubah Password (Opsional)</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Password Saat Ini
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Password Baru
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Konfirmasi Password Baru
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Simpan Perubahan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    name: profile.name,
                                                    email: profile.email,
                                                    currentPassword: "",
                                                    newPassword: "",
                                                    confirmPassword: ""
                                                });
                                            }}
                                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            Batal
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                            <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                            <p className="text-gray-600 mb-4">
                                Tindakan ini akan menghapus akun admin secara permanen dan tidak dapat dikembalikan.
                            </p>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Hapus Akun
                            </button>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-bold text-red-600 mb-4">Konfirmasi Hapus Akun</h3>
                            <p className="text-gray-600 mb-4">
                                Untuk mengkonfirmasi penghapusan akun, ketik email Anda: <strong>{profile.email}</strong>
                            </p>
                            <input
                                type="email"
                                value={deleteConfirmEmail}
                                onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                                placeholder="Masukkan email Anda"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
                            />
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmEmail !== profile.email}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Hapus Akun
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteConfirmEmail("");
                                    }}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfilePage;
