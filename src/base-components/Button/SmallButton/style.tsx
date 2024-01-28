import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { tooltipCSS2 } from "@/styles";

export const skinMap = {
  none: css`
    display: flex;
    flex-direction: column-reverse;
    background: none;
    border-radius: 10px;
    box-shadow: none;
    img {
      width: 24px;
      margin-bottom: 3px;
    }
    .tip {
      position: relative;
      top: -17px;
      span {
        padding: 0 10px;
        color: white;
        background-color: black;
        &::after {
          bottom: -10px;
          border-color: black transparent black;
          border-width: 10px 10px 0 10px;
        }
      }
    }
  `,
  light: css`
    display: flex;
    flex-direction: column-reverse;
    background: none;
    border-radius: 10px;
    box-shadow: none;
    img {
      width: 24px;
      margin-bottom: 3px;
    }
    .tip {
      position: relative;
      top: -17px;
      > span {
        padding: 0 10px;
        color: black;
        background-color: white;
        &::after {
          bottom: -10px;
          border-color: white transparent white;
          border-width: 10px 10px 0 10px;
        }
      }
    }
  `,
  green: css`
    display: flex;
    flex-direction: column-reverse;
    background: none;
    border-radius: 10px;
    box-shadow: none;
    img {
      width: 24px;
      margin-bottom: 3px;
    }
    .tip {
      position: relative;
      top: -17px;
      > span {
        padding: 0 10px;
        color: white;
        background-color: #339a52;
        &::after {
          bottom: -10px;
          border-color: #339a52 transparent #339a52;
          border-width: 10px 10px 0 10px;
        }
      }
    }
  `,
  skinDark: css`
    width: 46px;
    height: 30px;
    background: #212426;
    border-radius: 10px;
    box-shadow:
      -6px -6px 12px rgba(255, 255, 255, 0.04),
      6px 6px 12px rgba(0, 0, 0, 0.16);
    img {
      width: 24px;
      padding-top: 5px;
    }
  `,
  skinDarkRound: css`
    width: 30px;
    height: 30px;
    background: #212426;
    border-radius: 50%;
    box-shadow:
      -4.43478px -4.43478px 8.86957px rgba(255, 255, 255, 0.04),
      4.43478px 4.43478px 8.86957px rgba(0, 0, 0, 0.16);
    img {
      width: 14px;
      margin-top: 3px;
    }
  `,
  default: css``,
};

export const SmallButtonContainer = styled.div<{
  borderless?: boolean;
  skin?: string;
  cssStyle?: SerializedStyles;
  tipPosition?: "below" | "above";
}>`
  position: relative;
  width: 26px;
  height: 26px;
  line-height: 2;
  text-align: center;
  background: ${props => (props.borderless ? "rgba(0, 0, 0, 0)" : "#ffffff")};
  border-radius: 50%;
  box-shadow: ${props =>
    props.borderless
      ? ""
      : `-4.21622px -4.21622px 8.43243px rgba(255, 255, 255, 0.04),
          4.21622px 4.21622px 8.43243px rgba(0, 0, 0, 0.16)`};
  font-size: 12px;
  img {
    display: inline;
    width: 18px !important;
    // height: 18px !important;
    padding-top: 4px;
    margin: auto;
    object-fit: contain !important;
    vertical-align: -6px;
  }
  &:hover {
    cursor: pointer;
    div {
      visibility: visible;
    }
  }
  .tip {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 10px;
    visibility: hidden;
    &:hover {
      visibility: hidden;
    }
    span {
      ${tooltipCSS2}
    }
  }
  ${props => props.cssStyle};
  ${props => props.skin && skinMap[props.skin]}

  .small-button-font {
    font:
      16px/1.4 "",
      monospace;
    vertical-align: 1px;
  }
`;
