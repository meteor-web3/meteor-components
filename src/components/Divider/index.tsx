import * as React from "react";

import { SerializedStyles } from "@emotion/react";

import { DividerContainer, DividerNormal } from "./styles";

export interface DividerProps {
  space?: number;
  width?: string | number;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
  width = "100%",
  space = 20,
  cssStyle,
  className,
  style,
}) => (
  <DividerContainer
    space={space}
    width={width}
    css={cssStyle}
    className={className}
    style={style}
  >
    <DividerNormal />
  </DividerContainer>
);
