import TableRow from "./TableRow";

const Table = ({ columns, data }) => {
  return (
    <table className="border-t w-full min-h-0 h-full flex flex-col">
      <thead className="flex w-full flex-col px-4">
        <tr className="border-b flex">
          {columns.map((col) => (
            <th
              key={col.key}
              className={`font-semibold text-left py-3 px-1 ${col.className || "flex-1 truncate"}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="flex w-full flex-col flex-1 min-h-0 px-4">
        {data.map((item) => (
          <TableRow key={item.id} item={item} columns={columns} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
