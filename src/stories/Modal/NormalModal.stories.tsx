import { Button } from "@/components/Button";
import { NormalModal, NormalModalProps } from "@/components/Modal";
import { uuid } from "@/utils/uuid";
import { Meta, StoryObj } from "@storybook/react";

const Modal: React.FC<NormalModalProps> = ({
  showCloseButton,
  canClickOutsideToClose,
  controlVisible,
  hiddenScroll,
  portal,
  mask,
  onCancel,
  onOk,
  trigger,
}) => {
  return (
    <NormalModal
      onCancel={onCancel}
      onOk={onOk}
      trigger={trigger}
      id={uuid()}
      showCloseButton={showCloseButton}
      canClickOutsideToClose={canClickOutsideToClose}
      controlVisible={controlVisible}
      hiddenScroll={hiddenScroll}
      portal={portal}
      mask={mask}
    >
      <>{`random uuid: ${uuid()}`}</>
    </NormalModal>
  );
};

const meta = {
  title: "Base-Components/Modal/NormalModal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<NormalModalProps>;

export default meta;
type Story = StoryObj<NormalModalProps>;

export const Default: Story = {
  args: {
    showCloseButton: false,
    canClickOutsideToClose: true,
    controlVisible: false,
    portal: false,
    hiddenScroll: false,
    mask: false,
    trigger: <Button label='open modal' />,
  },
}