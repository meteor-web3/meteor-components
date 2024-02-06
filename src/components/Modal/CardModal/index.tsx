import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { css, SerializedStyles } from "@emotion/react";
import { createPortal } from "react-dom";

import { ModalWrap } from "./ModalWrap";

import { Button } from "@";
import { useClickOutside } from "@/components/Modal/hooks/useClickOutSide";
import usePortal from "@/components/Modal/hooks/usePortal";
import { uuid } from "@/utils/uuid";

export interface CardModalProps {
  title?: string;
  width?: number;
  children?: ReactNode;
  onCancel?: () => void;
  onOk?: () => boolean | void;
  trigger?: JSX.Element;
  id?: string;
  showCloseButton?: boolean;
  canClickOutsideToClose?: boolean;
  controlVisible?: boolean;
  hiddenScroll?: boolean;
  portal?: boolean;
  parentId?: string;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const CardModal: React.FC<CardModalProps> = ({
  title,
  width = 400,
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
  cssStyle,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(controlVisible);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(controlVisible);
  }, [controlVisible]);

  useEffect(() => {
    if (!visible) {
      onCancel?.();
    }
  }, [visible]);
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
  }, [trigger, visible]);

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
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [visible, id]);

  const target = usePortal(parentId);
  const elements = (
    <ModalWrap
      visible={visible}
      width={width}
      cssStyle={cssStyle}
      className={className}
      style={style}
    >
      <div id={id} className='maskContainer'>
        <div className='modalContainer' ref={modalRef}>
          <div className='headerContainer'>
            <div className='placeholder' />
            <div>{title}</div>
            {showCloseButton && (
              <Button
                onClick={() => {
                  handleClose();
                }}
                minWidth={20}
                type={"text"}
                cssStyle={css`
                  padding: 0;
                `}
              >
                X
              </Button>
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
              onClick={() => {
                if (onOk === undefined || onOk()) {
                  handleClose();
                }
              }}
              type='gray'
              minWidth={80}
            >
              ok
            </Button>
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
