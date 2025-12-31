import { Textarea } from "./textarea";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "管理画面/UI/テキストエリア",
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
    "aria-label": "Message",
    placeholder: "Type your message here...",
  },
};

export const WithValue: Story = {
  args: {
    "aria-label": "Message content",
    value: "This is some text content in the textarea.",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled message",
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

export const WithRows: Story = {
  args: {
    "aria-label": "Large message",
    placeholder: "Large textarea",
    rows: 8,
  },
};
