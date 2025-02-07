import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkBox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    "aria-label": "Checkbox",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    defaultChecked: false,
    name: "default-checkbox",
    value: "checked",
    label: "Option 1",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return (
      <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
    name: "required-checkbox",
  },
};
