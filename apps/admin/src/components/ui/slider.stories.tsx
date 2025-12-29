import { Slider } from "./slider";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Admin/UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Volume",
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const Range: Story = {
  args: {
    "aria-label": "Price range",
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Disabled slider",
    defaultValue: [50],
    max: 100,
    disabled: true,
  },
};

export const WithSteps: Story = {
  args: {
    "aria-label": "Step slider",
    defaultValue: [50],
    max: 100,
    step: 10,
  },
};
