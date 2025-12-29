import { Input } from "./input";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Admin/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Text input",
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    "aria-label": "Text content",
    value: "Hello World",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled input",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    "aria-label": "Password",
    type: "password",
    placeholder: "Enter password",
  },
};

export const Email: Story = {
  args: {
    "aria-label": "Email address",
    type: "email",
    placeholder: "email@example.com",
  },
};
