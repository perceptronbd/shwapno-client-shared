import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="min-w-full border-collapse border border-gray-300">
      <TableCaption className="text-center">Sample Table Caption</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-300">Name</TableHead>
          <TableHead className="border border-gray-300">Age</TableHead>
          <TableHead className="border border-gray-300">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border border-gray-300">John Doe</TableCell>
          <TableCell className="border border-gray-300">28</TableCell>
          <TableCell className="border border-gray-300">New York</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-gray-300">Jane Smith</TableCell>
          <TableCell className="border border-gray-300">32</TableCell>
          <TableCell className="border border-gray-300">Los Angeles</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
