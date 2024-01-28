import { BottomTabBar } from "@/base-components/BottomTabBar";
import { Meta, StoryObj } from "@storybook/react";
import iconInfo from "@/assets/icon/blackInfo.svg";
import { css } from "@emotion/react";
import { Button } from "@/base-components/Button";
import iconUnlock from "@/assets/icon/unlock.svg";

const meta = {
  title: "Base-Components/BottomTabBar",
  component: BottomTabBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomTabBar>;

export default meta;
type Story = StoryObj<typeof BottomTabBar>;

export const MessageTip: Story = {
  args: {
    defaultVisible: true,
    modalId: 'MessageTip',
    icon: <img
      src={iconInfo}
      css={css`
            width: 36px;
            height: 36px;
            margin-left: 3px;
          `}
    />,
    tips:
      <div>
        <div
          css={css`
              font-family: Poppins-Bold;
              font-weight: 700;
              font-size: 1rem;
              line-height: 1.5rem;
              color: "#000000";
            `}
        >
          {"Hello World"}
        </div>
      </div>,
    actions: <Button type="primary" label="done" />,
  },
};

export const PreviewTip: Story = {
  args: {
    defaultVisible: true,
    modalId: 'PreviewTip',
    cssStyle: css`width: 700px;`,
    icon: <img
      src={iconUnlock}
      css={css`
            width: 36px;
            height: 36px;
            margin-left: 3px;
          `}
    />,
    tips: <div>
      <div
        css={css`
              font-family: Poppins-Bold;
              font-weight: 700;
              font-size: 1rem;
              line-height: 1.5rem;
              color: #000000;
            `}
      >
        {("Select Preview Items")}
      </div>

      <div
        css={css`
              font-family: Poppins;
              font-weight: 400;
              font-size: 0.875rem;
              line-height: 1.3125rem;
              color: #a2a0a0;
            `}
      >
        {("People can view these items without paying")}
      </div>
    </div>,
    actions: <div css={css`
      display: flex;
      & > * {
        margin-left: 8px;
      }
    `}>
      <Button type="default" label="Cancel" />
      <Button type="primary" label="Edit" />
      <Button type="primary" label="Preview" />
    </div>
  }
}