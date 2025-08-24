import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | "single"; // true = multi-select, "single" = one row only
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === column.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key: column.dataIndex, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row: T) => {
    let updatedSelection: T[];
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection =
        selectable === "single" ? [row] : [...selectedRows, row];
    }

    setSelectedRows(updatedSelection);
    onRowSelect?.(updatedSelection);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600 dark:text-gray-100 shadow-md bg-white dark:bg-gray-800">
      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-300">
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-300">
          No data available
        </div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-zinc-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm uppercase">
            <tr>
              {selectable && <th className="p-4"></th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={`p-4 font-semibold ${
                    col.sortable
                      ? "cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                      : ""
                  }`}
                >
                  <span>{col.title}</span>
                  {col.sortable && (
                    <span className="ml-2 text-xs">
                      {sortConfig.key === col.dataIndex
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-600">
            {sortedData.map((row) => (
              <tr
                key={row.id}
                className={`transition hover:bg-blue-50 dark:hover:bg-gray-800 ${
                  selectedRows.includes(row)
                    ? "bg-blue-100 dark:bg-gray-800"
                    : "bg-white dark:bg-zinc-800"
                }`}
              >
                {selectable && (
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-4 text-gray-700 dark:text-gray-200"
                  >
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
