import React, { useEffect, useState } from "react";

import { SerializedStyles } from "@emotion/react";

import {
  CheckBoxContainerWrap,
  CheckBoxLabelSpanWrap,
  CheckBoxWrap,
} from "./style";

import iconTick from "@/assets/icon/tick_black_thin.svg";

export interface CheckBoxProps {
  label: string;
  defaultChecked?: boolean;
  controlChecked?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (checked: boolean) => void;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  defaultChecked = false,
  controlChecked,
  onClick,
  onChange,
  cssStyle,
  className,
  style,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    onChange?.(checked);
  }, [checked, onChange]);

  useEffect(() => {
    if (controlChecked !== undefined) {
      setChecked(controlChecked);
    }
  }, [controlChecked]);

  return (
    <CheckBoxContainerWrap
      onClick={e => {
        onClick?.(e);
        setChecked(checked => !checked);
      }}
      css={cssStyle}
      className={className}
      style={style}
    >
      <CheckBoxWrap>{checked && <img src={iconTick} />}</CheckBoxWrap>
      <CheckBoxLabelSpanWrap>{label}</CheckBoxLabelSpanWrap>
    </CheckBoxContainerWrap>
  );
};
