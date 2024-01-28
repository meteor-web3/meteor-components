import { Textarea, TextareaProps } from "@/base-components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<TextareaProps>;

export default meta;
type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    placeholder: "Please input something...",
    height: 100,
  },
};