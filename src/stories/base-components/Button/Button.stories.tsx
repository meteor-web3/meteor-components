import { Button, ButtonProps } from "@/base-components/Button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    label: "Button",
    minWidth: 90,
    type: "default",
    loading: false,
  },
};

