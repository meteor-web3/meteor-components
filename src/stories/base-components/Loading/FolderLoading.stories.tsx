import { FolderLoading, FolderLoadingProps } from "@/base-components/Loading";

import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Loading/FolderLoading",
  component: FolderLoading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<FolderLoadingProps>;

export default meta;
type Story = StoryObj<FolderLoadingProps>;

export const Default: Story = {
  args: {
    cardWidth: 200,
    cardHeight: 200,
  },
}