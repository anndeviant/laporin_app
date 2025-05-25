import StatusDisplay from './StatusDisplay';

const StatusSumary = ({ countsToday, countsWeek, statuse }) => {
  return (
    <nav className="bg-gray-100 flex p-4">
      <StatusDisplay title="Report Status" periodLabel="Today" counts={countsToday} statuses={statuse} />
      <StatusDisplay title="Report Status" periodLabel="Past 7 Days" counts={countsWeek} statuses={statuse}/>
    </nav>
  );
}

export default StatusSumary;