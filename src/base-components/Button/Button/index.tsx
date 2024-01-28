import React from "react";

import { SerializedStyles } from "@emotion/react";
import { motion } from "framer-motion";

import { ButtonContainerWrap } from "./style";

import { Loading } from "@/index";

export interface ButtonType {
  /**
   * Control the type of button style, default is `default`
   */
  type?: "primary" | "ghost" | "link" | "text" | "default" | "icon" | "gray";
}
export interface ButtonProps extends ButtonType {
  /**
   * The text content of button
   */
  label?: string;
  /**
   * Custom content of button
   */
  children?: React.ReactNode;
  /**
   * Callback when button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Root className
   */
  className?: string;
  /**
   * Custom css style of button
   */
  style?: React.CSSProperties;
  /**
   * The minimum width of button, default is `0`
   */
  minWidth?: number | string;
  /**
   * Control whether button is loading
   */
  loading?: boolean;
  /**
   * Custom css style of wrapper
   */
  cssStyle?: SerializedStyles;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  className,
  style,
  minWidth = 0,
  type = "default",
  loading,
  cssStyle,
}) => {
  return (
    <ButtonContainerWrap
      minWidth={minWidth}
      type={type}
      css={cssStyle}
      className={className}
    >
      <motion.div
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        style={style}
        className='button'
      >
        {loading ? <Loading size='small' /> : label || children}
      </motion.div>
    </ButtonContainerWrap>
  );
};
