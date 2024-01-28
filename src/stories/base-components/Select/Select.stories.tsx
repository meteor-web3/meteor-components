import { Select } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Select/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Select",
    width: "100%",
    options: [
      { name: "option1", value: "1" },
      { name: "option2", value: "2" },
    ],
  },
}