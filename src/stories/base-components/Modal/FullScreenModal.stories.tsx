import { Button } from "@/base-components/Button";
import { FullScreenModal } from "@/index";
import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base-Components/Modal/FullScreenModal",
  component: FullScreenModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FullScreenModal>;

export default meta;
type Story = StoryObj<typeof FullScreenModal>;

export const Default: Story = {
  args: {
    defaultVisible: false,
    id: "FullScreenModal",
    portal: true,
    showCloseButton: true,
    children: <div css={css`
      width: 100%;
      height: 60px;
      padding: 16px;
      border-radius: 8px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    `}>FullScreenModal</div>,
    trigger: <Button label="FullScreenModal" />,
  },
};

