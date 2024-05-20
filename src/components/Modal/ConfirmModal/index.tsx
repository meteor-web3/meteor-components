import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom";

import { ConfirmModalWrapper } from "./style";
import { FullScreenModal } from "../FullScreenModal";

import iconLoading from "@/assets/icon/loading.svg";
import { uuid } from "@/utils/uuid";

export interface ConfirmModalProps {
  defaultVisible?: boolean;
  controlVisible?: boolean;
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "success";
  clickOutsideToClose?: boolean;
}

export const ConfirmModal = ({
  defaultVisible = true,
  controlVisible,
  onCancel,
  onConfirm,
  title = "Confirm",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  clickOutsideToClose,
}: ConfirmModalProps) => {
  const [visible, setVisible] = useState<boolean>(defaultVisible);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [canceling, setCanceling] = useState<boolean>(false);

  useEffect(() => {
    if (controlVisible !== undefined) {
      setVisible(controlVisible);
    }
  }, [controlVisible]);

  const handleConfirm = async () => {
    setConfirming(true);
    await onConfirm?.();
    setConfirming(false);
    if (controlVisible === undefined) {
      setVisible(false);
    }
  };

  const handleCancel = async () => {
    setCanceling(true);
    await onCancel?.();
    setCanceling(false);
    if (controlVisible === undefined) {
      setVisible(false);
    }
  };

  return (
    <FullScreenModal
      controlVisible={visible}
      id={`confirm-modal-${uuid()}`}
      clickOutsideToClose={clickOutsideToClose}
      onCancel={handleCancel}
      rootStyle={{
        name: "confirm-modal-root",
        styles: `
          z-index: 1000;
        `,
      }}
    >
      <ConfirmModalWrapper type={type}>
        <h1 className='confirm-title'>{title}</h1>
        <p className='confirm-desc'>{description}</p>
        <div className='confirm-buttons'>
          <button className='confirm-button' onClick={handleConfirm}>
            {confirming ? <img src={iconLoading} /> : confirmText}
          </button>
          <button className='cancel-button' onClick={handleCancel}>
            {canceling ? <img src={iconLoading} /> : cancelText}
          </button>
        </div>
      </ConfirmModalWrapper>
    </FullScreenModal>
  );
};

ConfirmModal.open = (args: {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "success";
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
  clickOutsideToClose?: boolean;
}) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const container = document.createElement("div");
      document.body.appendChild(container);
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.render(
        <ConfirmModal
          {...args}
          onConfirm={async () => {
            await args.onConfirm?.();
            resolve(true);
            setTimeout(() => document.body.removeChild(container), 500);
          }}
          onCancel={async () => {
            await args.onCancel?.();
            resolve(false);
            setTimeout(() => document.body.removeChild(container), 500);
          }}
        />,
        container,
      );
    } catch (e) {
      reject(e);
    }
  });
};
