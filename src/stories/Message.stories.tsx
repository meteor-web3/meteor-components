import { Button } from "@/components/Button/Button";
import { message, MessageProps, MessageTypes } from "@/components/Message";
import { Meta, StoryObj } from "@storybook/react";

const Message: React.FC<MessageProps> = ({
  content,
  type,
  actions,
  duration,
}) => {
  return (
    <Button
      label='Message'
      onClick={() => {
        message({
          type,
          content,
          actions,
          duration,
        });
      }}
    />
  );
};

const meta = {
  title: "Base-Components/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: [MessageTypes.Error, MessageTypes.Info, MessageTypes.Success],
    },
  }
} satisfies Meta<MessageProps & { duration?: number }>;

export default meta;
type Story = StoryObj<MessageProps & { duration?: number }>;

export const Default: Story = {
  args: {
    type: MessageTypes.Info,
    content: "hello world",
    actions: [<Button label='ok' type="primary" />],
    duration: 3000,
  },
}