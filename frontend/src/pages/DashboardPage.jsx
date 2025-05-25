import MainDashboard from "../components/MainDashboard/MainDashboard";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import { BASE_URL } from "../utils";
import { useState, useEffect } from "react";
import axios from 'axios';

const DashboardPage = () => {
    const [reports, setReport] = useState([]);
    const [statusSummary, setStatusSummary] = useState(null);

    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        const response = await axios.get(`${ BASE_URL }/admin/reports`);
        setReport(response.data);
        const summary = calculateStatusCounts(response.data);
        setStatusSummary(summary);
    }

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
    if (!statusSummary) return <div>Loading dashboard...</div>;
    else return (
        <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
            <Sidebar activeItem={"home"}/>
            <div className="flex-1 flex flex-col" >
                <TopBar />
                <header aria-label="page caption" className=" flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
                    <h1 id="page-caption" className="font-semibold text-lg">Dashboard</h1>
                </header>
                <MainDashboard reports={reports} statusCountsToday={statusSummary.statusCountsToday} statusCountsWeek={statusSummary.statusCountsWeek} />
            </div>
        </div>

    )
}

export default DashboardPage;