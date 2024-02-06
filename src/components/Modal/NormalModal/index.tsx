import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { SerializedStyles } from "@emotion/react";
import { createPortal } from "react-dom";

import { ModalWrap } from "./ModalWrap";

import { Button } from "@/components/Button";
import { useClickOutside } from "@/components/Modal/hooks/useClickOutSide";
import usePortal from "@/components/Modal/hooks/usePortal";
import { uuid } from "@/utils/uuid";

export interface NormalModalProps {
  children?: ReactNode;
  onCancel: () => void;
  onOk?: () => void;
  trigger?: JSX.Element;
  id?: string;
  showCloseButton?: boolean;
  canClickOutsideToClose?: boolean;
  controlVisible?: boolean;
  hiddenScroll?: boolean;
  portal?: boolean;
  parentId?: string;
  mask?: boolean;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const NormalModal: React.FC<NormalModalProps> = ({
  children,
  onCancel,
  onOk,
  id = uuid(),
  controlVisible = false,
  showCloseButton = false,
  canClickOutsideToClose = true,
  hiddenScroll = true,
  portal = false,
  parentId = "root",
  trigger,
  mask = false,
  cssStyle,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(controlVisible);
  const modalRef = useRef<HTMLDivElement>(null);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return React.cloneElement(trigger, {
      key: "trigger",
      ...trigger.props,
      onClick: async (e: any) => {
        setVisible(!visible);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setVisible, trigger, visible]);

  const handleClose = () => {
    setVisible(false);
  };

  useClickOutside(modalRef, () => {
    if (canClickOutsideToClose) {
      handleClose();
    }
  });

  useEffect(() => {
    if (visible && hiddenScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [visible, id]);

  const target = usePortal(parentId);
  const elements = (
    <ModalWrap
      visible={visible}
      mask={mask}
      css={cssStyle}
      className={className}
      style={style}
    >
      <div id={id} className='maskContainer'>
        <div className='modalContainer' ref={modalRef}>
          <div className='headerContainer'>
            {showCloseButton && (
              <Button
                onClick={() => {
                  handleClose();
                }}
                minWidth={20}
                type={"text"}
                label={"X"}
              />
            )}
          </div>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className='childrenContainer'
          >
            {children}
          </div>

          <div className='footerContainer'>
            <Button
              label='cancel'
              onClick={() => {
                handleClose();
                onCancel?.();
              }}
              style={{ marginRight: 10 }}
            />
            <Button
              label='ok'
              type='primary'
              onClick={() => {
                handleClose();
                onOk?.();
              }}
            />
          </div>
        </div>
      </div>
    </ModalWrap>
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
};
