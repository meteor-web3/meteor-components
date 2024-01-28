import { RadioButton } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: "A",
    checked: false,
    onClick: () => {},
  },
}