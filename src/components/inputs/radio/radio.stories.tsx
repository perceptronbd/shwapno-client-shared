import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  args: {
    name: "example-radio",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Disabled Option", value: "option3", disabled: true },
    ],
    defaultValue: "option1", // Default value when no selection is made
    disabled: false, // Group disabled state
    required: false, // Required state for the radio group
    orientation: "horizontal", // Example enum for orientation
    onValueChange: (value: string) => {
      console.log("Selected value:", value); // Action on value change
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option1", disabled: true },
      { label: "Option 2", value: "option2", disabled: true },
    ],
    disabled: true,
  },
};

export const CustomStyling: Story = {
  args: {
    className: "bg-gray-100 p-4 rounded-md",
    options: [
      { label: "Styled Option 1", value: "option1" },
      { label: "Styled Option 2", value: "option2" },
    ],
  },
};
