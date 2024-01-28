import { ImageLoading, ImageLoadingProps } from "@/base-components/Loading";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Loading/ImageLoading",
  component: ImageLoading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<ImageLoadingProps>;

export default meta;
type Story = StoryObj<ImageLoadingProps>;

export const Default: Story = {
  args: {
    
  },
}