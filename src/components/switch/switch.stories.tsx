import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

// Define metadata for the Switch component
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["active", "inActive", "inactiveDisabled", "activeDisabled"],
      description: "The variant of the switch.",
    },
    containerClass: {
      control: "text",
      description: "Additional CSS classes for the container.",
    },
    ballClass: {
      control: "text",
      description: "Additional CSS classes for the ball.",
    },
    isToggled: {
      control: "boolean",
      description: "The current toggle state of the switch.",
    },
  },
};

export default meta;

// Define story templates
type Story = StoryObj<typeof Switch>;

// Default Switch Story
export const Default: Story = {
  args: {
    type: "active",
    isToggled: false,
  },
  render: (args) => {
    const [isToggled, setIsToggled] = useState(args.isToggled);
    return (
      <Switch {...args} isToggled={isToggled} setIsToggled={setIsToggled} />
    );
  },
};

// Active State Story
export const Active: Story = {
  args: {
    type: "active",
    isToggled: true,
  },
};

// Inactive State Story
export const Inactive: Story = {
  args: {
    type: "inActive",
    isToggled: false,
  },
};

// Disabled Active State Story
export const DisabledActive: Story = {
  args: {
    type: "activeDisabled",
    isToggled: true,
  },
};

// Disabled Inactive State Story
export const DisabledInactive: Story = {
  args: {
    type: "inactiveDisabled",
    isToggled: false,
  },
};
