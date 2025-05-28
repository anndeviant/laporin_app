import MainDashboard from "../components/MainDashboard/MainDashboard";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import { BASE_URL } from "../utils";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const DashboardPage = () => {
    const [reports, setReport] = useState([]);
    const [statusSummary, setStatusSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        const response = await axiosInstance.get(`${BASE_URL}/admin/reports`);
        setReport(response.data);
        const summary = calculateStatusCounts(response.data);
        setStatusSummary(summary);
        setLoading(false);
    }

    const handleUpdate = async (updatedReport) => {
        try {
            const res = await axiosInstance.patch(`${BASE_URL}/admin/reports/${updatedReport.id}`, updatedReport);
            const updatedData = res.data;

            const updatedReports = reports.map((r) =>
                r.id === updatedData.id ? updatedData : r
            );
            setReport(updatedReports);

            const summary = calculateStatusCounts(updatedReports);
            setStatusSummary(summary);
        } catch (err) {
            alert("Gagal update laporan.");
            console.error("Detail error:", err);
        }
    };


    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`${BASE_URL}/admin/reports/${id}`);
            const updatedReports = reports.filter((r) => r.id !== id);
            setReport(updatedReports);
            const summary = calculateStatusCounts(updatedReports);
            setStatusSummary(summary);
        } catch (error) {
            console.error("Gagal menghapus Report:");
        }
    };

    // Fungsi menghitung jumlah status laporan
    const calculateStatusCounts = (reports) => {
        const today = new Date();
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 6); // mencakup 7 hari

        const initialCounts = {
            pending: 0,
            verified: 0,
            in_progress: 0,
            resolved: 0,
            rejected: 0,
        };

        const statusCountsToday = { ...initialCounts };
        const statusCountsWeek = { ...initialCounts };

        reports.forEach((report) => {
            const createdAt = new Date(report.updatedAt);
            if (createdAt >= todayStart) {
                statusCountsToday[report.status] += 1;
            }

            if (createdAt >= weekAgo) {
                statusCountsWeek[report.status] += 1;
            }
        });

        return { statusCountsToday, statusCountsWeek };
    };
    if (loading) {
        return (
            <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
                <Sidebar activeItem="dashboard" />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
                        <h1 className="font-semibold text-lg">Dashboard</h1>
                    </header>

                    {/* Loading Spinner - matching AdminProfilePage style */}
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
            <Sidebar activeItem={"dashboard"} />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <header aria-label="page caption" className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
                    <h1 id="page-caption" className="font-semibold text-lg">Dashboard</h1>
                </header>
                <MainDashboard onDeleteReport={handleDelete} onUpdateReport={handleUpdate} reports={reports} statusCountsToday={statusSummary.statusCountsToday} statusCountsWeek={statusSummary.statusCountsWeek} />
            </div>
        </div>
    )
}

export default DashboardPage;