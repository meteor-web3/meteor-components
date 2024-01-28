import { Button } from "@/base-components/Button";
import { CardModal, CardModalProps } from "@/base-components/Modal";
import { uuid } from "@/utils/uuid";
import { Meta, StoryObj } from "@storybook/react";

const Modal: React.FC<CardModalProps> = ({
  title,
  width = 400,
  onCancel,
  onOk,
  controlVisible = false,
  showCloseButton = false,
  canClickOutsideToClose = true,
  hiddenScroll = true,
  portal = false,
  parentId = "root",
  trigger,
  cssStyle,
}) => {
  return (
    <CardModal
      title={title}
      width={width}
      cssStyle={cssStyle}
      parentId={parentId}
      onCancel={onCancel}
      onOk={onOk}
      trigger={trigger}
      id={uuid()}
      showCloseButton={showCloseButton}
      canClickOutsideToClose={canClickOutsideToClose}
      controlVisible={controlVisible}
      hiddenScroll={hiddenScroll}
      portal={portal}
    >
      <>{`random uuid: ${uuid()}`}</>
    </CardModal>
  );
};

const meta = {
  title: "Base-Components/Modal/CardModal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<CardModalProps>;

export default meta;
type Story = StoryObj<CardModalProps>;

export const Default: Story = {
  args: {
    title: "Card Modal",
    showCloseButton: true,
    canClickOutsideToClose: true,
    controlVisible: false,
    portal: false,
    hiddenScroll: false,
    trigger: <Button label='open modal' />,
  },
}