import { Loading } from "@/components/Loading";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Loading/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    visible: true,
    spring: false,
    status: "loading",
    type: "circle",
    size: "default",
    duration: 1,
  },
}