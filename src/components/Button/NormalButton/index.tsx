import { ReactNode } from "react";

import { SerializedStyles } from "@emotion/react";

import { ButtonWrap } from "./style";

import iconLoading from "@/assets/icon/loading.svg";

export interface NormalButtonProps {
  children?: ReactNode;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const NormalButton: React.FC<NormalButtonProps> = function ({
  children,
  loading,
  onClick,
  cssStyle,
  className,
  style,
}: NormalButtonProps) {
  return (
    <ButtonWrap
      loading={loading}
      css={cssStyle}
      className={className}
      style={style}
      onClick={onClick}
    >
      <div className='container'>{children}</div>
      <img src={iconLoading} style={{ display: loading ? "block" : "none" }} />
    </ButtonWrap>
  );
};
