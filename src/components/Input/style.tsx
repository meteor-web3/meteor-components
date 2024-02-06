import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const InputContainer = styled.div<{
  rootCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  outerSkin?: keyof typeof OuterSkin;
  inputSkin?: keyof typeof InputSkin;
}>`
  display: flex;
  align-items: center;
  ${props => OuterSkin[props.outerSkin || "none"]}
  ${props => props.rootCss}

  > input {
    ${props => InputSkin[props.inputSkin || "none"]}
    ${props => props.inputCss}
  }
`;

export const OuterSkin = {
  bordered: css`
    background: #ffffff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    width: 288px;
    height: 40px;
    border: none;
    outline: none;
    margin-right: 16px;
    padding: 0 12px;
    @media screen and (max-width: 420px) {
      width: 215px;
    }
  `,
  none: css`
    width: 100%;
  `,
};

export const InputSkin = {
  data: css`
    width: 100%;
    background: #f8f7f7;
    border: 1px solid #fff;
    border-radius: 6px;
    font-size: 0.75rem;
    line-height: 0.75rem;
    padding: 5px 10px;
    transition: all 0.3s;
    &::placeholder {
      color: #c5c5c5;
    }
  `,
  normal: css`
    width: 100%;
    height: 24px;
    padding: 20px 15px;
    font-size: 16px;
    border-radius: 12px;
    border: solid 1px rgb(212, 212, 216);
    color: black;
    &::placeholder {
      color: #aeb0b2;
    }
    &:focus {
      border-color: #8b5cf6;
      border-width: 2px;
    }
  `,
  none: css`
    width: 100%;
  `,
};
