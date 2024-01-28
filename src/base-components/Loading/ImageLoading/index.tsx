import { ReactNode } from "react";

import { css, SerializedStyles } from "@emotion/react";

import iconSpinner from "@/assets/icon/spinner.svg";
import { colors } from "@/styles";

export interface ImageLoadingProps {
  children?: ReactNode;
  cssStyle?: SerializedStyles;
}

export const ImageLoading = function ({
  children,
  cssStyle,
}: ImageLoadingProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: ${colors.nftbg};
        border-radius: 16px;
        ${cssStyle};
      `}
    >
      {children || (
        <img
          src={iconSpinner}
          css={css`
            @keyframes _18hu3ey0 {
              to {
                transform: rotate(1turn);
              }
            }
            animation: _18hu3ey0 1.4s linear infinite;
            width: 30px;
            height: 30px;
          `}
        />
      )}
    </div>
  );
};
