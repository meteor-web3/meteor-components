import { MonetizeSetting, MonetizeSettingProps } from "@/business-components";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Business-Components/MonetizePost",
  component: MonetizeSetting,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<MonetizeSettingProps>;

export default meta;
type Story = StoryObj<MonetizeSettingProps>;

export const Default: Story = {
  args: {
    
  },
};