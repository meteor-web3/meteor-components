import { Header, HeaderProps } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {
    topTip: "This is a top tip",
    defaultShowTopTip: true,
    userName: "User Name",
  },
};

export const CustomRightContent: Story = {
  args: {
    customRightContent: <div>Custom Right Content</div>,
  },
}