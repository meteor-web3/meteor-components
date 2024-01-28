import React, { useRef } from "react";

import { SerializedStyles } from "@emotion/react";

import { InputBox } from "./styled";

export interface TextareaProps {
  width?: number | string;
  height?: number | string;
  value?: string;
  center?: boolean;
  fontSize?: string;
  placeholder?: string;
  content?: React.MutableRefObject<string>;
  readOnly?: boolean;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
}

/**
 * A ez way to handle input correctly
 * @param placeholder {string} 默认占位符
 * @param content {string} 默认值
 * @returns
 */
export const Textarea: React.FC<TextareaProps> = ({
  height = 500,
  width = 500,
  center = false,
  fontSize = 24,
  placeholder,
  content,
  value,
  readOnly = false,
  cssStyle,
  className,
  style,
  onChange,
  onKeyDown,
  onBlur,
  onClick,
}) => {
  const _content = useRef<string>("");
  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    _content.current = e.currentTarget.value;
    if (content) {
      content.current = e.currentTarget.value;
    }
  };
  return (
    <InputBox
      width={width}
      height={height}
      center={center}
      fontSize={fontSize}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      css={cssStyle}
      className={className}
      style={style}
      onInput={handleChange}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};
