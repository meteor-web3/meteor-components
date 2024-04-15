import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ConfirmModalWrapper = styled.div<{
  type: "danger" | "warning" | "success";
}>`
  width: 437px;
  padding: 30px 40px;
  border-radius: 18px;
  background: #fff;
  display: flex;
  flex-direction: column;

  h1.confirm-title {
    /* font */
    font-family: Poppins-SemiBold;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  p.confirm-desc {
    margin-top: 4px;
    /* font */
    font-family: Poppins-Medium;
    font-size: 20px;
    /* font-weight: 600; */
    line-height: 24px;
  }

  .confirm-buttons {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    button {
      border-radius: 10px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* font */
      font-family: Poppins-Medium;
      font-size: 16px;
      /* font-weight: 600; */
      line-height: 19px;
      img {
        height: 19px;
      }
    }

    ${({ type }) => type === "danger" && dangerButtonStyle}
    ${({ type }) => type === "warning" && warningButtonStyle}
    ${({ type }) => type === "success" && successButtonStyle}
  }
`;

const dangerButtonStyle = css`
  .confirm-button {
    background: #ea3223;
    color: #ffffff;
  }
  .cancel-button {
    border: 1px solid #007aff;
    color: #007aff;
    background: #ffffff;
  }
`;

const warningButtonStyle = css`
  .confirm-button {
    background: #f5a623;
    color: #ffffff;
  }
  .cancel-button {
    border: 1px solid #007aff;
    color: #007aff;
    background: #ffffff;
  }
`;

const successButtonStyle = css`
  .confirm-button {
    background: #00b341;
    color: #ffffff;
  }
  .cancel-button {
    border: 1px solid #007aff;
    color: #007aff;
    background: #ffffff;
  }
`;
