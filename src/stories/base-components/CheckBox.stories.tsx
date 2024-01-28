import { CheckBoxProps } from "@/base-components/CheckBox";
import { CheckBox } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<CheckBoxProps>;

export default meta;
type Story = StoryObj<CheckBoxProps>;

export const Default: Story = {
  args: {
    label: "check",
    defaultChecked: false,
  },
};