import React from "react";
import InputField from "components/InputField/InputField";
import DataTable from "components/DataTable/DataTable";

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-10 space-y-16">
      <section className="max-w-xl mx-auto bg-white dark:bg-zinc-800 dark:border-gray-700 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-300 border-b dark:border-zinc-700 pb-3">
          InputField
        </h1>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We'll never share your email."
          variant="filled"
          size="md"
          clearable
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          //   invalid
          //   disabled
          variant="filled"
          errorMessage="Password is too short"
          passwordToggle
          size="md"
        />
      </section>

      <section className="max-w-3xl mx-auto bg-white  dark:bg-zinc-800 dark:border-gray-700 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-zinc-300 border-b dark:border-zinc-700 pb-3">
          DataTable
        </h1>
        <DataTable
          data={[
            { id: 1, name: "Bruce", age: 24 },
            { id: 2, name: "Steve", age: 22 },
            { id: 3, name: "Tony", age: 32 },
          ]}
          columns={[
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "age", title: "Age", dataIndex: "age", sortable: true },
          ]}
          selectable
        />
      </section>
    </main>
  );
}

export default App;
