export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | "single"; // true = multi-select, "single" = one row only
  onRowSelect?: (selectedRows: T[]) => void;
}
