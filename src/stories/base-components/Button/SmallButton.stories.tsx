import { SmallButton, SmallButtonProps } from "@/base-components/Button/SmallButton";
import { Meta, StoryObj } from "@storybook/react";
import iconRefresh from "@/assets/icon/refresh.png";
import iconShare from "@/assets/icon/share.png";
import iconDownload from "@/assets/icon/download.png";
import { css } from "@emotion/react";

const meta = {
  title: "Base-Components/Button/SmallButton",
  component: SmallButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<SmallButtonProps>;

export default meta;
type Story = StoryObj<SmallButtonProps>;

export const DownloadButton: Story = {
  args: {
    content: iconDownload,
    tip: 'Download File',
    cssStyle: css`
            > div {
              margin-top: 16px;
            }
          `,
    borderless: true,
  }
}

export const RefreshButton: Story = {
  args: {
    content: iconRefresh,
    tip: 'Refresh',
    loading: false,
  }
}

export const ShareToTwitterButton: Story = {
  args: {
    content: iconShare,
    tip: 'Share to Twitter',
    skin: 'skinDark',
  },
};

