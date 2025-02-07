import type { Meta, StoryObj } from "@storybook/react";
import { Chips } from "./chips";

const meta: Meta<typeof Chips> = {
  title: "Components/Chips",
  component: Chips,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Chips>;

export const Default: Story = {
  args: {
    variant: "primary",
  },
};
