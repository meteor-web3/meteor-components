import { SelectNormal, SelectNormalProps } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Select/SelectNormal",
  component: SelectNormal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<SelectNormalProps>;

export default meta;
type Story = StoryObj<SelectNormalProps>;

const options = [
  { name: "option1", value: "value1" },
  { name: "option2", value: "value2" },
  { name: "option3", value: "value3" },
];

export const Default: Story = {
  args: {
    list: options,
    defaultOption: options[0],
  },
}