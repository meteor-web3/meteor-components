import { Input, InputProps } from "@/base-components/Input";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: "input",
  }
}

export const Number: Story = {
  args: {
    pattern: "^([0-9][0-9]*)+(.[0-9]{1,17})?$",
    type: "number",
    placeholder: "eg 20",
    decimalPlaces: 17,
    positive: true,
    canBeEmpty: false,
    inputSkin: "data",
  },
}

export const OuterBordered: Story = {
  args: {
    type: "text",
    placeholder: "bordered",
    outerSkin: "bordered",
  }
}

export const InputNormal: Story = {
  args: {
    type: "text",
    placeholder: "normal",
    inputSkin: "normal",
  }
}