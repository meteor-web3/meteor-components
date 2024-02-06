import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const AvatarContainer = styled.div<{
  isOuter?: boolean;
  isMiddle?: boolean;
  cssStyles?: SerializedStyles;
}>`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: ${props => props.isOuter && "pointer"};
  &:hover {
    > div {
      visibility: ${props => props.isMiddle && "visible"};
    }
  }
  ${props => props.cssStyles};

  .outer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 5px;
    height: 5px;
    background: "#32D74B";
    border-radius: 50%;
  }
`;

export const AvatarImage = styled.img<{
  imageIsLoaded: boolean;
}>`
  width: 100%;
  height: 100%;
  background: ${props =>
    !props.imageIsLoaded &&
    `conic-gradient(
      from 105.11deg at 50% 50%,
      #8f94bf 0deg,
      #fde8e9 75deg,
      #8f94bf 360deg
    )`};
  border-radius: 50%;
  object-fit: cover;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.04),
    6px 6px 12px rgba(0, 0, 0, 0.16);
`;

export const AvatarImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 105.11deg at 50% 50%,
    #8f94bf 0deg,
    #fde8e9 75deg,
    #8f94bf 360deg
  );
  border-radius: 50%;
  object-fit: cover;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.04),
    6px 6px 12px rgba(0, 0, 0, 0.16);
`;

export const AvatarMask = styled.div<{
  isOuter?: boolean;
  isMiddle?: boolean;
}>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  visibility: ${props => (props.isOuter || props.isMiddle) && "hidden"};

  & > .edit {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.isMiddle && "rgba(0, 0, 0, 0.2)"};
    border-radius: 50%;
  }

  & > .container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
  }

  .img-edit {
    width: 16px;
    margin-bottom: 3px;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    backdrop-filter: blur(4px);
    background-color: rgba(15, 20, 25, 0.35);
    transition-duration: 0.2s;
    &:hover {
      background-color: rgba(39, 44, 48, 0.35);
    }
  }
`;
