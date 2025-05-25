import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

const MainDashboard = ({
    statusCountsToday,
    statusCountsWeek,
    reports
}) => {
    return (
        <main className="flex-grow flex h-full overflow-hidden border-t">
            <LeftSide reports={reports}/>
            <RightSide reports={reports} statusCountsToday={statusCountsToday} statusCountsWeek={statusCountsWeek} />
        </main>
    )
}

export default MainDashboard;