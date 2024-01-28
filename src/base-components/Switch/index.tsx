import { useEffect, useState } from "react";

import { SwitchButton, SwitchDot } from "./styled";

interface SwitchProps {
  defaultChecked?: boolean;
  controlChecked?: boolean;
  onChange?: (value: boolean) => void;
  size?: "default" | "small";
  cssStyle?: string;
  className?: string;
  style?: React.CSSProperties;
}

const checkLeftSize = {
  default: "calc(100% - 20px);",
  small: "calc(100% - 14px);",
};

export const Switch = function ({
  defaultChecked,
  controlChecked,
  onChange,
  size = "default",
  cssStyle,
  className,
  style,
}: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    if (controlChecked !== undefined) {
      setChecked(controlChecked);
    }
  }, [controlChecked]);

  return (
    <SwitchButton
      size={size}
      checked={checked}
      type='button'
      role='switch'
      aria-checked='true'
      ant-click-animating='false'
      onClick={() => {
        setChecked(!checked);
        onChange?.(!checked);
      }}
      css={cssStyle}
      className={className}
      style={style}
    >
      <SwitchDot
        size={size}
        checked={checked}
        checkedLeft={checkLeftSize[size]}
      ></SwitchDot>
    </SwitchButton>
  );
};
