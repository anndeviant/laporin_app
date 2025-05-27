import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Phone,
    Mail,
    MapPin,
    ChevronDown,
} from "lucide-react";
import logo from "../assets/images/laporinlogo.png"; // Ganti dengan path logo yang sesuai


const HelpPage = () => {
    const navigate = useNavigate();
    const [activeNavItem, setActiveNavItem] = useState('bantuan');
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "Bagaimana cara melaporkan kerusakan infrastruktur?",
            answer: "Anda dapat melaporkan kerusakan infrastruktur dengan mengisi formulir pengaduan di halaman 'Lapor'. Pastikan untuk menyertakan foto sebagai bukti dan informasi lokasi yang jelas."
        },
        {
            id: 2,
            question: "Berapa lama waktu yang dibutuhkan untuk mendapat tanggapan?",
            answer: "Waktu tanggapan bervariasi tergantung jenis dan tingkat urgensi laporan. Umumnya, verifikasi awal dilakukan dalam 1-3 hari kerja, dan tindak lanjut dalam 7-14 hari kerja."
        },
        {
            id: 3,
            question: "Apakah saya bisa melacak status laporan saya?",
            answer: "Ya, setelah mengirim laporan, Anda akan mendapat kode referensi yang dapat digunakan untuk melacak status laporan melalui kontak yang tersedia."
        },
        {
            id: 4,
            question: "Jenis kerusakan apa saja yang bisa dilaporkan?",
            answer: "Anda dapat melaporkan berbagai jenis kerusakan infrastruktur seperti jalan berlubang, lampu jalan mati, saluran air tersumbat, fasilitas umum rusak, dan masalah infrastruktur lainnya."
        },
        {
            id: 5,
            question: "Apakah ada biaya untuk melaporkan?",
            answer: "Tidak, layanan pelaporan melalui platform Lapor.In sepenuhnya gratis dan dapat diakses oleh seluruh masyarakat."
        },
        {
            id: 6,
            question: "Bagaimana jika laporan saya ditolak?",
            answer: "Jika laporan ditolak, Anda akan mendapat notifikasi beserta alasan penolakan. Anda dapat mengajukan laporan baru dengan perbaikan sesuai saran yang diberikan."
        }
    ];

    const steps = [
        {
            step: 1,
            title: "Isi Formulir",
            description: "Lengkapi formulir pengaduan dengan informasi yang jelas dan akurat",
            icon: <FileText className="w-6 h-6" />
        },
        {
            step: 2,
            title: "Upload Bukti",
            description: "Sertakan foto sebagai bukti pendukung masalah yang dilaporkan",
            icon: <AlertCircle className="w-6 h-6" />
        },
        {
            step: 3,
            title: "Verifikasi",
            description: "Tim kami akan memverifikasi laporan dalam 1-3 hari kerja",
            icon: <CheckCircle className="w-6 h-6" />
        },
        {
            step: 4,
            title: "Tindak Lanjut",
            description: "Instansi terkait akan menindaklanjuti sesuai dengan prosedur",
            icon: <Clock className="w-6 h-6" />
        }
    ];

    const statusConfig = {
        pending: { label: "Menunggu Verifikasi", color: "bg-gray-200 text-gray-800", icon: Clock },
        verified: { label: "Terverifikasi", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
        in_progress: { label: "Sedang Diproses", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
        resolved: { label: "Selesai", color: "bg-green-100 text-green-800", icon: CheckCircle },
        rejected: { label: "Ditolak", color: "bg-red-100 text-red-800", icon: XCircle }
    };

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const handleBerandaClick = () => {
        setActiveNavItem('beranda');
        navigate('/');
    };

    const handleLaporClick = () => {
        setActiveNavItem('lapor');
        navigate('/form');
    };

    const handleTrackingClick = () => {
        setActiveNavItem('tracking');
        navigate('/tracking');
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
                                onClick={handleTrackingClick}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'tracking'
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                Lacak Laporan
                            </button>
                            <button
                                onClick={() => setActiveNavItem('bantuan')}
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

                            <h1 className="text-4xl lg:text-6xl font-bold ml-6">Pusat Bantuan</h1>
                        </div>
                        <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                            Temukan jawaban atas pertanyaan Anda dan pelajari cara menggunakan platform Lapor.In dengan mudah dan efektif
                        </p>
                    </div>
                </section>

                {/* How to Report Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Cara Melaporkan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Ikuti langkah-langkah sederhana berikut untuk melaporkan kerusakan infrastruktur dengan efektif
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((step, index) => (
                                <div key={step.step} className="relative">
                                    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow h-72 flex flex-col">
                                        <div className="mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                                {step.icon}
                                            </div>
                                            <div className="text-base font-semibold text-blue-600 mb-3">
                                                Langkah {step.step}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center">
                                            <p className="text-gray-600 text-base leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Status Information */}
                <section className="py-20 bg-white/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Informasi Status Laporan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Pahami arti dari setiap status untuk memantau progress penanganan laporan Anda
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.entries(statusConfig).map(([status, config]) => {
                                const Icon = config.icon;
                                return (
                                    <div key={status} className="bg-white rounded-lg shadow-md p-8">
                                        <div className="flex items-center mb-4">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                                                <Icon className="w-4 h-4 mr-1" />
                                                {config.label}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-base leading-relaxed">
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

                {/* FAQ Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Pertanyaan yang Sering Diajukan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Temukan jawaban atas pertanyaan yang paling sering ditanyakan oleh pengguna
                            </p>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-6 h-6 text-gray-500 transform transition-transform ${openFaq === faq.id ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openFaq === faq.id && (
                                        <div className="px-8 pb-6 border-t border-gray-100">
                                            <p className="text-gray-600 mt-4 text-base leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                Masih Butuh Bantuan?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                                Tim support kami siap membantu Anda dengan respon cepat dan solusi terbaik
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Phone className="w-10 h-10" />
                                </div>
                                <h3 className="font-semibold mb-3 text-xl">Telepon</h3>
                                <p className="text-blue-100 text-lg">0800-1234-5678</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-10 h-10" />
                                </div>
                                <h3 className="font-semibold mb-3 text-xl">Email</h3>
                                <p className="text-blue-100 text-lg">support@lapor.in</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="w-10 h-10" />
                                </div>
                                <h3 className="font-semibold mb-3 text-xl">Kantor</h3>
                                <p className="text-blue-100 text-lg">Jakarta Pusat</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpPage;
