import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle, MapPin, User } from "lucide-react";
import logo from "../assets/images/laporinlogo.png";

const TrackingPage = () => {
    const navigate = useNavigate();
    const [activeNavItem, setActiveNavItem] = useState('tracking');
    const [searchValue, setSearchValue] = useState('');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const statusConfig = {
        pending: { label: "Menunggu Verifikasi", color: "bg-gray-200 text-gray-800", icon: Clock },
        verified: { label: "Terverifikasi", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
        in_progress: { label: "Sedang Diproses", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
        resolved: { label: "Selesai", color: "bg-green-100 text-green-800", icon: CheckCircle },
        rejected: { label: "Ditolak", color: "bg-red-100 text-red-800", icon: XCircle }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            alert("Mohon masukkan kontak pelapor (email/nomor HP)");
            return;
        }

        setLoading(true);
        setSearched(true);
        try {
            const response = await axios.get(`${BASE_URL}/public/reports/track/${searchValue}`);
            setReports(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                setReports([]);
            } else {
                alert("Terjadi kesalahan saat mencari laporan");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBerandaClick = () => {
        setActiveNavItem('beranda');
        navigate('/');
    };

    const handleLaporClick = () => {
        setActiveNavItem('lapor');
        navigate('/form');
    };

    const handleBantuanClick = () => {
        setActiveNavItem('bantuan');
        navigate('/bantuan');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
            {/* Modern Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={logo}
                                alt="Lapor.In Logo"
                                width={30}
                            />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                Lapor.In
                            </span>
                        </div>

                        {/* Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={handleBerandaClick}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'beranda'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                Beranda
                            </button>
                            <button
                                onClick={handleLaporClick}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'lapor'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                Lapor
                            </button>
                            <button
                                onClick={() => setActiveNavItem('tracking')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'tracking'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                Lacak Laporan
                            </button>
                            <button
                                onClick={handleBantuanClick}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'bantuan'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                Bantuan
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-16">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-20 lg:py-24">
                    <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center mb-8">
                            <Search className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl lg:text-6xl font-bold">Lacak Laporan</h1>
                        </div>
                        <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Cari dan pantau status semua laporan yang pernah Anda buat dengan mudah
                        </p>
                    </div>
                </section>

                {/* Search Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Cari Laporan Anda
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Masukkan email atau nomor HP yang Anda gunakan saat membuat laporan untuk melihat semua status laporan Anda
                                </p>
                            </div>

                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        placeholder="Masukkan email atau nomor HP Anda..."
                                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Mencari...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Search className="w-5 h-5" />
                                            <span>Cari Laporan</span>
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                {searched && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                        <div className="max-w-6xl mx-auto">
                            {reports.length === 0 ? (
                                <div className="text-center py-16">
                                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Tidak Ada Laporan Ditemukan
                                    </h3>
                                    <p className="text-gray-600">
                                        Tidak ada laporan yang ditemukan dengan kontak yang Anda masukkan.
                                        Pastikan email atau nomor HP yang dimasukkan sudah benar.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                            Laporan Anda ({reports.length})
                                        </h2>
                                        <p className="text-gray-600">
                                            Berikut adalah semua laporan yang pernah Anda buat
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        {reports.map((report) => {
                                            const statusInfo = statusConfig[report.status];
                                            const StatusIcon = statusInfo.icon;

                                            return (
                                                <div key={report.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                                        {report.title}
                                                                    </h3>
                                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                                                        <StatusIcon className="w-4 h-4 mr-1" />
                                                                        {statusInfo.label}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        ID: #{report.id}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {formatDate(report.createdAt)}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                                {report.description}
                                                            </p>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                                <div className="flex items-center text-gray-600">
                                                                    <MapPin className="w-4 h-4 mr-2" />
                                                                    <span className="truncate">{report.location}</span>
                                                                </div>
                                                                <div className="flex items-center text-gray-600">
                                                                    <User className="w-4 h-4 mr-2" />
                                                                    <span>{report.reporter_name}</span>
                                                                </div>
                                                                <div className="flex items-center text-gray-600">
                                                                    <FileText className="w-4 h-4 mr-2" />
                                                                    <span>{report.report_category?.name || 'Kategori tidak tersedia'}</span>
                                                                </div>
                                                            </div>

                                                            {report.government_agency && (
                                                                <div className="mt-3 text-sm text-blue-600">
                                                                    <strong>Ditangani oleh:</strong> {report.government_agency.name}
                                                                </div>
                                                            )}

                                                            {report.updatedAt !== report.createdAt && (
                                                                <div className="mt-3 text-xs text-gray-500">
                                                                    Terakhir diperbarui: {formatDate(report.updatedAt)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Info Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Informasi Status Laporan
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Pahami arti dari setiap status untuk memantau progress penanganan laporan Anda
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(statusConfig).map(([status, config]) => {
                                const Icon = config.icon;
                                return (
                                    <div key={status} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center mb-3">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                                                <Icon className="w-4 h-4 mr-1" />
                                                {config.label}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            {status === 'pending' && 'Laporan Anda sedang menunggu verifikasi dari tim kami'}
                                            {status === 'verified' && 'Laporan telah diverifikasi dan diteruskan ke instansi terkait'}
                                            {status === 'in_progress' && 'Instansi terkait sedang menangani masalah yang dilaporkan'}
                                            {status === 'resolved' && 'Masalah telah selesai ditangani oleh instansi terkait'}
                                            {status === 'rejected' && 'Laporan ditolak karena tidak memenuhi kriteria'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TrackingPage;
