import { Label } from "./label";
import { Switch } from "./switch";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Admin/UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle switch",
  },
};

export const Checked: Story = {
  args: {
    "aria-label": "Toggle switch",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Toggle switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    "aria-label": "Toggle switch",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
