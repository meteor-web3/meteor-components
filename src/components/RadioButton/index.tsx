import React from "react";

import { SerializedStyles } from "@emotion/react";

import { RadioButtonWrap } from "./RadioButtonWrap";

export interface SubmitButtonProps {
  label: string;
  checked: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const RadioButton: React.FC<SubmitButtonProps> = ({
  label,
  checked,
  onClick,
  cssStyle,
  className,
  style,
}) => {
  return (
    <RadioButtonWrap css={cssStyle} className={className} style={style}>
      <div className='radioButtonContainer' onClick={onClick}>
        <div className='radioContainer'>
          {checked && <div className='radio' />}
        </div>
        <span className='labelSpan'>{label}</span>
      </div>
    </RadioButtonWrap>
  );
};
