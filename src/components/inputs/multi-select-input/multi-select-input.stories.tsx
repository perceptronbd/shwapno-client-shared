import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelectInput } from "./multi-select-input";
import { Icons } from "../../../icons/index";

const meta: Meta<typeof MultiSelectInput> = {
  title: "Components/MultiSelectInput",
  component: MultiSelectInput,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showSearch: { control: "boolean" },
    showSelectAll: { control: "boolean" },
    onChange: { action: "changed" },
  },
  args: {
    className: "w-full",
    dropdownClassName: "w-full",
    options: [
      { label: "Times Square", value: "times_square" },
      { label: "Grand Central", value: "grand_central" },
      { label: "Union Station", value: "union_station" },
      { label: "Downtown Plaza", value: "downtown_plaza" },
      { label: "Rosewood Mall", value: "rosewood_mall" },
      { label: "Seaside Market", value: "seaside_market" },
      { label: "Maple Avenue", value: "maple_avenue" },
    ],
    placeholder: "Select locations...",
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return (
      <div className="w-full p-4">
        <MultiSelectInput
          {...args}
          value={selectedValues}
          onChange={(values) => {
            setSelectedValues(values);
            args.onChange?.(values);
          }}
        />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectInput>;

export const Basic: Story = {};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: "This field is required",
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const WithInitialSelection: Story = {
  args: {
    value: ["head_office", "central_rama3"],
  },
};

export const CustomizedStyling: Story = {
  args: {
    className: "border-2 border-primary-500",
    dropdownClassName: "bg-neutral-50",
    chipClassName: "bg-primary-100 text-primary-800",
    icon: <Icons.ChevronDown />,
  },
};

export const MinimalConfiguration: Story = {
  args: {
    showSearch: true,
    showSelectAll: false,
  },
};

export const EmptyState: Story = {
  args: {
    options: [],
    showSelectAll: false,
  },
};
