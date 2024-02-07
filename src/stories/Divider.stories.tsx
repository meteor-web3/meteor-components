import { Divider as DividerSrc, DividerProps } from "@/index";
import { Meta, StoryObj } from "@storybook/react";

const Divider: React.FC<DividerProps> = ({
  width = "100%",
  space = 20,
}: DividerProps) => {
  return <>
    <div>text above divider</div>
    <DividerSrc width={width} space={space} />
    <div>text below divider</div>
  </>
}

const meta = {
  title: "Base-Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<DividerProps>;

export default meta;
type Story = StoryObj<DividerProps>;

export const Default: Story = {
  args: {
    width: "100%",
    space: 20,
  },
};