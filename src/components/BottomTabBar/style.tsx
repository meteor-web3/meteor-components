import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const modalStyle = css`
  top: unset;
  background: unset;
  > div {
    width: 100%;
    height: 100%;
  }
`;

export const TabBarContainer = styled.div<{
  cssStyle?: SerializedStyles;
}>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 34px;
  width: 624px;
  max-width: 100%;
  height: 75px;
  margin: auto;
  display: flex;
  align-items: center;
  background: rgba(248, 247, 247, 0.9);
  box-shadow: 3px 4px 41px 3px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  ${props => props.cssStyle};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 81px;
  height: 100%;
  border-right: solid 1px #d9d9d9;
`;

export const ContentContainer = styled.div`
  width: calc(100% - 71px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 29px 14px 20px;
`;
