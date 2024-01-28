import styled from "@emotion/styled";

export const FullScreenMask = styled.div<{
  visible: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  background: rgba(1, 1, 1, 0.6);
  opacity: ${props => (props.visible ? "1" : "0")};
  transition: opacity 0.15s;

  .mask-modal-container {
    max-width: 100%;
    max-height: 100%;
    opacity: ${props => (props.visible ? "1" : "0")};
    transition: all 0.3s;
    transform: ${props => (props.visible ? "scale(1)" : "scale(0.3)")};
  }

  .mask-close-button {
    position: absolute;
    right: 38px;
    top: 38px;
    z-index: 1;
    width: 25px;
    height: 25px;
    background: #000;
    border-radius: 50%;
    transform: rotate(180deg);
    cursor: pointer;
  }
`;
