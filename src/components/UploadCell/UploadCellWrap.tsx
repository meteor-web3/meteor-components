import styled from "@emotion/styled";

export const UploadCellWrap = styled.div<{
  width: number | string;
  height: number | string;
}>`
  .uploadCellContainer {
    width: ${props =>
      typeof props.width === "number" ? `${props.width}px` : props.width};
    height: ${props =>
      typeof props.height === "number" ? `${props.height}px` : props.height};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(246, 246, 246);
    border-radius: 12px;
    cursor: pointer;
  }
  .iconContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props =>
      typeof props.width === "number" ? `${props.width}px` : props.width};
    height: ${props =>
      typeof props.height === "number" ? `${props.height}px` : props.height};
    background: #f6f6f6;
    border-radius: 12px;
    cursor: pointer;
  }
  .label {
    margin: 14px auto 0 auto;
    width: ${props =>
      typeof props.width === "number" ? `${props.width}px` : props.width};
  }
  .tip {
    font-family: Poppins-SemiBold;
    font-weight: 600;
    font-size: 12px;
    color: #000;
    line-height: 33px;
  }
`;
