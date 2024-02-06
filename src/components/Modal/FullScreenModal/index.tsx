import {
  cloneElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { SerializedStyles } from "@emotion/react";
import { createPortal } from "react-dom";

import { FullScreenMask } from "./style";

import iconClose from "@/assets/icon/close.svg";
import { NormalButton } from "@/components/Button/NormalButton";
import usePortal from "@/components/Modal/hooks/usePortal";
import { uuid } from "@/utils/uuid";

export interface FullScreenModalProps {
  /**
   * Whether to show modal by default
   */
  defaultVisible?: boolean;
  /**
   * Controllable whether to show modal
   */
  controlVisible?: boolean;
  /**
   * The HTML id of modal
   */
  id?: string;
  /**
   * Modal content
   */
  children?: ReactNode;
  /**
   * Callback when modal will be closed
   */
  onCancel?: () => void;
  /**
   * Callback when click mask
   */
  onClick?: () => void;
  /**
   * Modal style
   */
  modalStyle?: SerializedStyles;
  /**
   * Mask style
   */
  rootStyle?: SerializedStyles;
  /**
   * Whether to show close button in the upper right corner
   */
  showCloseButton?: boolean;
  /**
   * Whether to close modal when click mask
   */
  clickOutsideToClose?: boolean;
  /**
   * Whether to hide the scrollbar of HTML body
   */
  hidden?: boolean;
  /**
   * Whether to create portal for modal
   */
  portal?: boolean;
  /**
   * The trigger element to show modal
   */
  trigger?: JSX.Element;
}

export function FullScreenModal({
  children,
  defaultVisible = false,
  controlVisible,
  onCancel,
  onClick,
  modalStyle,
  rootStyle,
  id = uuid(),
  showCloseButton = false,
  clickOutsideToClose = true,
  hidden = true,
  portal = false,
  trigger,
}: FullScreenModalProps) {
  const [visible, setVisible] = useState(defaultVisible);
  const modalEle = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(
    (event: any) => {
      if (
        clickOutsideToClose &&
        visible &&
        !modalEle.current?.contains(event.target as any)
      ) {
        event.stopPropagation();
        onCancel?.();
        if (controlVisible === undefined) {
          setVisible(false);
          document
            .getElementById(id)
            ?.removeEventListener("click", handleClose);
          document.body.style.overflow = "auto";
        }
      }
    },
    [clickOutsideToClose, id, onCancel, visible],
  );

  useEffect(() => {
    if (controlVisible !== undefined) {
      setVisible(controlVisible);
    }
  }, [controlVisible]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = hidden ? "hidden" : "auto";
      document.getElementById(id)?.addEventListener("click", handleClose);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.getElementById(id)?.removeEventListener("click", handleClose);
    };
  }, [onCancel, visible, id, handleClose]);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return cloneElement(trigger, {
      key: "trigger",
      ...trigger.props,
      onClick: async (e: any) => {
        setVisible(!visible);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setVisible, trigger, visible]);
  const target = usePortal("root");
  const elements = (
    <FullScreenMask id={id} visible={visible} css={rootStyle}>
      <div
        ref={modalEle}
        onClick={e => {
          e.stopPropagation();
          onClick && onClick();
        }}
        className='mask-modal-container'
        css={modalStyle}
      >
        {children}
      </div>
      {showCloseButton && (
        <NormalButton className='mask-close-button' onClick={handleClose}>
          <img src={iconClose} width='15px' height='15px' />
        </NormalButton>
      )}
    </FullScreenMask>
  );

  return portal ? (
    <>
      {triggerDom}
      {createPortal(elements, target)}
    </>
  ) : (
    <>
      {triggerDom}
      {elements}
    </>
  );
}
