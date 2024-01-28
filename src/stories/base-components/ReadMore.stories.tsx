import { ReadMore, ReadMoreProps } from "@/base-components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/ReadMore",
  component: ReadMore,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<ReadMoreProps>;

export default meta;
type Story = StoryObj<ReadMoreProps>;

export const Default: Story = {
  args: {
    line: 2,
    showReadMore: true,
    content: "This is a long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long content.",
  },
};