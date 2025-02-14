// Toaster.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./toaster";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// Default/Disabled Toast
export const Disabled: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() => toast("This is a default toast")}
        className="max-w-40 rounded bg-gray-100 px-4 py-2 text-gray-600"
      >
        Show Disabled Toast
      </button>
    </div>
  ),
};

// Success Toast
export const Success: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() => toast.success("Operation completed successfully")}
        className="bg-success-100 text-success-400 rounded px-4 py-2"
      >
        Show Success Toast
      </button>
    </div>
  ),
};

// Error Toast
export const ToastError: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() => toast.error("An error occurred")}
        className="bg-error-100 text-error-400 rounded px-4 py-2"
      >
        Show Error Toast
      </button>
    </div>
  ),
};

// Warning Toast
export const Warning: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() => toast.warning("Warning: Please be cautious")}
        className="bg-warning-100 text-warning-400 rounded px-4 py-2"
      >
        Show Warning Toast
      </button>
    </div>
  ),
};

// With Description
export const WithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() =>
          toast("Toast Title", {
            description:
              "This is a more detailed description of the toast message",
          })
        }
        className="rounded bg-gray-100 px-4 py-2 text-gray-600"
      >
        Show Toast with Description
      </button>
    </div>
  ),
};

// With Duration
export const WithDuration: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() =>
          toast.success("Custom Duration Toast", {
            duration: 5000, // 5 seconds
          })
        }
        className="bg-success-100 text-success-400 rounded px-4 py-2"
      >
        Show 5s Duration Toast
      </button>
    </div>
  ),
};
