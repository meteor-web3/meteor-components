import { NormalButton, NormalButtonProps } from "@/components/Button";
import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import iconClose from "@/assets/icon/close.svg";

const meta = {
  title: "Base-Components/Button/NormalButton",
  component: NormalButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<NormalButtonProps>;

export default meta;
type Story = StoryObj<NormalButtonProps>;

export const CloseButton: Story = {
  args: {
    children: <img
      src={iconClose}
      width="15px"
      height="15px"
    />,
    loading: false,
    cssStyle: css`
      z-index: 1;
      width: 25px;
      height: 25px;
      background: #000;
      border-radius: 50%;
      transform: rotate(180deg);
      cursor: pointer;
    `
  },
};

