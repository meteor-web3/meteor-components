import styled from "@emotion/styled";

export const HeaderDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 998;
`;

export const Note = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25px;
  background-color: #007aff;
  /* opacity: 0.6; */
  font-size: 12px;
  color: white;
  text-align: center;
  line-height: 25px;
  .closeIcon {
    width: 12px;
    height: 12px;
    margin-left: 1.5rem;
    cursor: pointer;
  }
`;

export const RawHeaderDiv = styled.div`
  height: 54px;
  width: 100%;
  border-bottom: 1px solid #0000001a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  background-color: #ffffff;
`;
export const LeftBox = styled.div`
  /* width: 14.472vw; */
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RigBox = styled.div`
  /* width: 14.444vw; */
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-account-avatar {
    width: 32px;
    height: 32px;
    > img,
    > div {
      border-radius: 50%;
    }
    cursor: default !important;
  }
`;
export const LinkBox = styled.div`
  height: 40px;
  padding: 0 0.5vw;
  background: #00000008;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const ImgLogo = styled.img`
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
`;
export const ImgLogoTxt = styled.p`
  width: auto;
  font-family: Lato-SemiBold;
  font-size: 18px;
  text-align: left;
  margin-left: 12px;
`;
export const AccountTxt = styled.p`
  width: auto;
  height: 20px;
  margin-left: 0.5vw;
  font-size: 14px;
  font-family: Poppins-Medium;
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  color: #242220;
`;
