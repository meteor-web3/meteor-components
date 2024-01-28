import { UnlockPost, UnlockPostProps } from "@/business-components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Business-Components/UnlockPost",
  component: UnlockPost,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<UnlockPostProps>;

export default meta;
type Story = StoryObj<UnlockPostProps>;

export const Default: Story = {
  args: {
    
  },
};