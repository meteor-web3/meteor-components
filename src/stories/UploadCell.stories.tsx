import { UploadCell } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/UploadCell",
  component: UploadCell,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UploadCell>;

export default meta;
type Story = StoryObj<typeof UploadCell>;

export const Default: Story = {
  args: {
    label: "Upload your image",
    width: 200,
    height: 200,
  },
}