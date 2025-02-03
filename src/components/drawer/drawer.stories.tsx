import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./drawer";
import { Button } from "../buttons/button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={handleClose}>
          {/* <div className="text-white">
            <h2>Drawer Content</h2>
            <p>This is some content inside the drawer.</p>
          </div> */}
        </Drawer>
      </>
    );
  },
};
