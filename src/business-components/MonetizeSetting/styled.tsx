import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

import { pixelProofing } from "@/utils/ui";

export const Wrapper = styled.div`
  .tip {
    font-size: small;
    margin-top: 30px;
    .link {
      color: blue;
      margin-left: 5px;
      text-decoration: initial;
      outline: initial;
      cursor: pointer;
    }
  }
`;

export const PostWapper = styled.div<{ marginTop: number | string }>`
  display: flex;
  flex-direction: column;
  margin-top: ${props =>
    typeof props.marginTop === "number"
      ? `${props.marginTop}px`
      : pixelProofing(props.marginTop)};
  width: calc(100% - 70px);
  padding: 27px 34px;
  border: 1px solid #e9e9e9;
  border-radius: 12px;
`;

export const Title = styled.div<{ cssStyles?: SerializedStyles }>`
  font-family: Poppins-Medium;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  margin-top: 30px;
  margin-bottom: 6px;
  ${props => props.cssStyles}
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const EncryptWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export const UnlimitedWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

export const UnlimitedCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #eeeeee;
  border-radius: 4px;
  margin-left: 16px;
  margin-right: 4px;
`;

export const UnlimitedCheckBoxImg = styled.img`
  width: 16px;
`;

export const UnlimitedText = styled.div`
  font-family: Poppins;
  font-size: 0.75rem;
  line-height: 1.125px;
  color: #000000;
`;
