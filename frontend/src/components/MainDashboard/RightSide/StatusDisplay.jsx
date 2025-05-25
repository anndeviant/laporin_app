const StatusDisplay = ({ title, periodLabel, counts, statuses }) => {

  return (
    <section className="mr-4 focus:outline-none">
      <label className="font-semibold block mb-1 text-sm">
        {title} <span className="font-normal text-gray-700">({periodLabel})</span>
      </label>
      <ul className="flex">
        {statuses.map((status) => (
          <li key={status}>
            <div className="p-2 bg-white flex flex-col items-center border border-gray-300 rounded-md mr-1">
              <p className="font-semibold text-lg">{counts[status] || 0}</p>
              <p className="uppercase text-gray-600 text-xs">{status.replace('_', ' ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatusDisplay;
