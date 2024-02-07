import meteorLogo from "@/assets/icon/meteorLogo.png";
import { Auth, AuthProps } from "@/components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Auth",
  component: Auth,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<AuthProps>;

export default meta;
type Story = StoryObj<AuthProps>;

export const Default: Story = {
  args: {
  },
}