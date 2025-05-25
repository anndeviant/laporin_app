const TableRow = ({ item, columns }) => {
  return (
    <tr className="hover:bg-blue-100 border-b flex cursor-pointer">
      {columns.map((col) => (
        <td
          key={col.key}
          className={`py-3 px-1 ${col.className || "flex-1 truncate"}`}
        >
          {col.render ? col.render(item[col.key], item) : item[col.key]}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
