import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";
import { Megaphone, Users, BarChart3, Shield } from "lucide-react";
import imageLanding from '../assets/images/landinglaporin.png'; // Adjust the path as necessary
import logo from "../assets/images/laporinlogo.png"; // Ganti dengan path logo yang sesuai

const LandingPage = () => {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState({
        totalReports: 0,
        totalAgencies: 0,
        resolvedReports: 0,
        pendingReports: 0
    });
    const [activeNavItem, setActiveNavItem] = useState('beranda');

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            // Fetch report statistics
            // const statsResponse = await axios.get(`${BASE_URL}/public/statistics`);
            const reportsResponse = await axios.get(`${BASE_URL}/public/reports`);
            const agenciesResponse = await axios.get(`${BASE_URL}/public/agencies`);

            const totalReports = reportsResponse.data.length;
            const resolvedReports = reportsResponse.data.filter(report => report.status === 'resolved').length;
            const pendingReports = reportsResponse.data.filter(report => report.status === 'pending').length;
            const totalAgencies = agenciesResponse.data.length;

            setStatistics({
                totalReports,
                totalAgencies,
                resolvedReports,
                pendingReports
            });
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    const handleLaporClick = () => {
        setActiveNavItem('lapor');
        navigate('/form');
    };

    const handleBantuanClick = () => {
        setActiveNavItem('bantuan');
        navigate('/bantuan');
    };

    const handleTrackingClick = () => {
        setActiveNavItem('tracking');
        navigate('/tracking');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
            {/* Transparent Navbar */}
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
                                onClick={() => setActiveNavItem('beranda')}
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
                                onClick={handleTrackingClick}
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

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                                    {/* <Shield className="w-4 h-4 mr-2" /> */}
                                    Platform Pelaporan Terpercaya
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Laporkan Kerusakan
                                    <span className="block bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                                        Infrastruktur
                                    </span>
                                    dengan Mudah
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Sampaikan aduan Anda terkait fasilitas umum di lingkungan sekitar secara cepat,
                                    mudah, dan langsung tersambung dengan instansi terkait untuk penanganan yang efektif.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleLaporClick}
                                    className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Lapor.In Sekarang
                                </button>
                                <p className="text-sm text-gray-500">
                                    Gratis dan mudah digunakan • Tanggapan cepat dari instansi terkait
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 gap-6 pt-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Transparan</h3>
                                        <p className="text-sm text-gray-600">Lacak status laporan real-time</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Terpercaya</h3>
                                        <p className="text-sm text-gray-600">Terintegrasi dengan pemerintah</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                                <img
                                    src={imageLanding}
                                    alt="Pelaporan Infrastruktur"
                                    className="w-full h-96 object-cover rounded-xl"
                                />
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white p-4 rounded-xl shadow-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{statistics.totalReports}</div>
                                        <div className="text-sm opacity-90">Total Laporan</div>
                                    </div>
                                </div>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute top-8 left-8 w-full h-full bg-gradient-to-r from-blue-100 to-sky-100 rounded-2xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Statistik Platform
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Data real-time mengenai aktivitas pelaporan dan keterlibatan instansi pemerintah
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Megaphone className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{statistics.totalReports}</div>
                            <div className="text-gray-600 font-medium">Total Laporan</div>
                        </div>

                        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{statistics.resolvedReports}</div>
                            <div className="text-gray-600 font-medium">Laporan Selesai</div>
                        </div>

                        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-yellow-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{statistics.pendingReports}</div>
                            <div className="text-gray-600 font-medium">Menunggu Verifikasi</div>
                        </div>

                        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{statistics.totalAgencies}</div>
                            <div className="text-gray-600 font-medium">Instansi Terhubung</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-sky-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Siap Melaporkan Kerusakan Infrastruktur?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Bergabunglah dengan ribuan warga yang telah mempercayai platform kami
                    </p>
                    <button
                        onClick={handleLaporClick}
                        className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Mulai Lapor.In Sekarang
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src={logo}
                                    alt="Lapor.In Logo"
                                    width={30}
                                />
                                <span className="text-xl font-bold">Lapor.In</span>
                            </div>
                            <p className="text-gray-400">
                                Platform pelaporan kerusakan infrastruktur yang menghubungkan masyarakat dengan pemerintah.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Layanan</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Pelaporan Kerusakan</li>
                                <li>Tracking Status</li>
                                <li>Verifikasi Laporan</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Bantuan</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Cara Melaporkan</li>
                                <li>FAQ</li>
                                <li>Kontak Support</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Lapor.In. Semua hak cipta dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
