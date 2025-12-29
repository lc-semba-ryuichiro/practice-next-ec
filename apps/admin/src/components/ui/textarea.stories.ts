import { Textarea } from "./textarea";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Admin/UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
};

export const WithValue: Story = {
  args: {
    value: "This is some text content in the textarea.",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

export const WithRows: Story = {
  args: {
    placeholder: "Large textarea",
    rows: 8,
  },
};
