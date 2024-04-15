import meteorLogo from "@/assets/icon/meteorLogo.png";
import { Auth, AuthProps, useAuth } from "@/components";
import { Button, Tooltip } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

const EmbedAuth = (props: AuthProps) => { 
  const {
    autoConnecting,
    connecting,
    connectRes,
    selectedProvider,
    connectedWallet,
  } = useAuth({ ...props, autoConnect: true });
  
  return (
    <Tooltip
      title={
        <span>
          selectedProvider: {String(selectedProvider)}<br/>
          connectedWallet: {String(connectedWallet)}<br/>
          address: {String(connectRes?.address)}<br/>
          pkh: {String(connectRes?.pkh)}<br/>
          chain: {String(connectRes?.chain)}<br/>
          wallet: {String(connectRes?.wallet)}<br/>
        </span>
      }
    >
      <Button onClick={() => Auth.openModal(props)}>
        {autoConnecting
          ? "Auto Connecting..."
          : connecting
          ? "Connecting..."
          : connectRes
          ? "Connected"
          : "Connect"}
      </Button>
    </Tooltip>
  );
}

const meta = {
  title: "Base-Components/Auth.auto-connect",
  component: EmbedAuth,
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