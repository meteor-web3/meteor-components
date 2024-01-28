import styled from "@emotion/styled";

export const Wrapper = styled.div`
  max-width: 100%;
  /* width: calc(50% - 0.6875rem); */
  margin: 0.35rem;
  /* &:nth-child(2n + 1) {
    order: 1;
  }
  &:nth-child(2n) {
    order: 2;
  } */
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
`;

export const Content = styled.div`
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
  padding: 27px 26px;
  padding-bottom: 21px;
  /* max-width: calc(100% - 3.35rem); */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  justify-items: center;
  align-items: center;
`;

export const UploadImg = styled.img`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const UploadImgWrapper = styled.div`
  height: 25%;
  width: 25%;
  position: relative;
`;

export const UploadImgCross = styled.img`
  cursor: pointer;
  position: absolute;
  right: 10%;
  top: 10%;
  width: 1.5rem;
  height: 1.5rem;
`;

export const AccountStatus = styled.div`
  display: flex;
  justify-items: center;
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;

  .avatar {
    height: 1.85rem;
    width: 1.85rem;
  }

  .name {
    font-family: Poppins-SemiBold;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.85rem;
    margin-left: 0.57rem;
    color: #000000;
  }
`;

export const EncryptWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  .title {
    font-family: Poppins-Medium;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    margin-bottom: 6px;
  }
`;
