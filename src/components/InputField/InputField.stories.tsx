import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import InputField, { InputFieldProps } from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: {
      control: { type: "select", options: ["outlined", "filled", "ghost"] },
    },
    size: { control: { type: "select", options: ["sm", "md", "lg"] } },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Username",
  placeholder: "Enter your username",
  helperText: "This will be your public username.",
  variant: "outlined",
  size: "md",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Email",
  placeholder: "Enter your email",
  invalid: true,
  errorMessage: "Invalid email address",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled input",
  placeholder: "Cannot type here",
  disabled: true,
};

export const PasswordToggle = Template.bind({});
PasswordToggle.args = {
  label: "Password",
  placeholder: "Enter password",
  passwordToggle: true,
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: "Search",
  placeholder: "Type to clear",
  clearable: true,
};

export const Loading = Template.bind({});
Loading.args = {
  label: "Loading input",
  placeholder: "Wait a moment...",
  loading: true,
};
