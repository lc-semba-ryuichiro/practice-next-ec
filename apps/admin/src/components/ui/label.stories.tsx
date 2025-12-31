import { Input } from "./input";
import { Label } from "./label";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "管理画面/UI/ラベル",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        placeholder="Email"
      />
    </div>
  ),
};
