import type { Meta, StoryObj } from "@storybook/react";
import { FloatingLabelInput } from "./floating-label-input";
import { Icons } from "../../../icons/index";

const meta: Meta<typeof FloatingLabelInput> = {
  title: "Components/FloatingLabelInput",
  component: FloatingLabelInput,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Enter text...",
    label: "Input Label",
  },
};

export default meta;
type Story = StoryObj<typeof FloatingLabelInput>;

export const Default: Story = {
  args: {
    type: "text",
    Icon: Icons.Mail,
  },
};

export const WithError: Story = {
  args: {
    type: "email",
    Icon: Icons.Mail,
    errorMessage: "This field is required",
    label: "Email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
  },
};
