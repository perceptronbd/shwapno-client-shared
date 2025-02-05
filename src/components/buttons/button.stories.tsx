// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Icons } from "../../Icons/index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click me",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const IconButton: Story = {
  args: {
    size: "icon",
    children: <Icons.Mail />,
  },
};
