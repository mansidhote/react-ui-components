import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DataTable, { DataTableProps, Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta;

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  return <DataTable {...args} onRowSelect={(rows) => setSelectedRows(rows)} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 29 },
  ],
  columns,
};

export const SelectableMultiple = Template.bind({});
SelectableMultiple.args = {
  data: [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 29 },
    { id: 3, name: "Charlie", age: 32 },
  ],
  columns,
  selectable: true,
};

export const SelectableSingle = Template.bind({});
SelectableSingle.args = {
  data: [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 29 },
  ],
  columns,
  selectable: "single",
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns,
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns,
};
