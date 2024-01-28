import { PublishPost as OriPublishPost, PublishPostProps } from "@/business-components";
import { MeteorContextProvider } from "@meteor-web3/hooks";
import { Meta, StoryObj } from "@storybook/react";

const PublishPost = (props: PublishPostProps) => {
  return <MeteorContextProvider>
    <OriPublishPost {...props} />
  </MeteorContextProvider>
}

const meta = {
  title: "Business-Components/PublishPost",
  component: PublishPost,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<PublishPostProps>;

export default meta;
type Story = StoryObj<PublishPostProps>;

export const Default: Story = {
  args: {
    
  },
};