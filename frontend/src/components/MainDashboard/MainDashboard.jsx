import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const MainDashboard = ({
    statusCountsToday,
    statusCountsWeek,
    onUpdateReport,
    onDeleteReport,
    reports
}) => {
    return (
        <main className="flex-grow flex h-full overflow-hidden border-t">
            <LeftSide reports={reports} onUpdateReport={onUpdateReport}/>
            <RightSide reports={reports} statusCountsToday={statusCountsToday} statusCountsWeek={statusCountsWeek} onUpdateReport={onUpdateReport} onDeleteReport={onDeleteReport}/>
        </main>
    )
}

export default MainDashboard;