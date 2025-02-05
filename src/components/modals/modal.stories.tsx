import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./modal";
import { useState } from "react";
import { Button } from "../buttons/button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={setIsOpen}>
          <div className="p-4 bg-blue-400 w-full">
            <h2 className="text-lg font-semibold">Modal Title</h2>
            <p className="mt-2">This is a sample modal content.</p>
          </div>
        </Modal>
      </>
    );
  },
};
