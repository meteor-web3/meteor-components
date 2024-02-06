import { ReactNode, useEffect, useState } from "react";

import { SerializedStyles } from "@emotion/react";

import {
  ContentContainer,
  IconContainer,
  modalStyle,
  TabBarContainer,
} from "./style";
import { FullScreenModal } from "../Modal";

export interface BottomTabBarProps {
  /**
   * Whether to show bar by default, default is `true`
   */
  defaultVisible?: boolean;
  /**
   * Controllable whether to show bar
   */
  controlVisible?: boolean;
  /**
   * The duration of bar showing, default is undefined, means bar will not be closed automatically
   */
  duration?: number;
  /**
   * Callback when bar will be closed
   */
  onCancel?: () => void;
  /**
   * The HTML id of modal
   */
  modalId: string;
  /**
   * Icon of bar, will be shown in the left
   */
  icon: ReactNode;
  /**
   * Tips of bar, will be shown in the middle
   */
  tips: ReactNode;
  /**
   * Actions of bar, will be shown in the right
   */
  actions?: ReactNode;
  /**
   * Whether to hide the scrollbar of HTML body, default is `false`
   */
  hidden?: boolean;
  /**
   * Custom css style of bar
   */
  cssStyle?: SerializedStyles;
  /**
   * Root className
   */
  className?: string;
  /**
   * Root css styles
   */
  style?: React.CSSProperties;
}

export const BottomTabBar = function ({
  defaultVisible = true,
  duration,
  controlVisible,
  onCancel,
  modalId,
  icon,
  tips,
  actions,
  hidden = false,
  cssStyle,
  className,
  style,
}: BottomTabBarProps) {
  const [visible, setVisible] = useState<boolean>();

  useEffect(() => {
    if (controlVisible !== undefined) {
      setVisible(controlVisible);
    }
  }, [controlVisible]);

  useEffect(() => {
    if (
      defaultVisible === true &&
      controlVisible !== undefined &&
      duration !== undefined
    ) {
      setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  }, []);

  return (
    <FullScreenModal
      defaultVisible={defaultVisible}
      controlVisible={visible}
      onCancel={onCancel}
      id={modalId}
      rootStyle={modalStyle}
      hidden={hidden}
    >
      <TabBarContainer cssStyle={cssStyle} className={className} style={style}>
        <IconContainer>{icon}</IconContainer>
        <ContentContainer>
          {tips}
          {actions}
        </ContentContainer>
      </TabBarContainer>
    </FullScreenModal>
  );
};
