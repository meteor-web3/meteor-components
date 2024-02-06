import meteorLogo from "@/assets/icon/meteorLogo.png";
import { Avatar, AvatarProps } from "@/components/Avatar";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  args: {
    avatar: meteorLogo,
    isMiddle: false,
    isOuter: false,
    isInner: false,
    imageLoading: false,
  },
}