import styled from "@emotion/styled";

export const InnerLoadingWrap = styled.div<{
  size: number;
  type: "circle" | "dots";
  status: "loading" | "ok";
}>`
  .iconSpinner {
    pointer-events: none;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    transition: opacity 0.3s;
  }

  .dot {
    box-sizing: border-box;
    background: #9e9e9e;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    border-radius: 50px;
    width: ${props => props.size - 24}px;
    height: ${props => props.size - 22}px;
    position: absolute;
  }

  .dots {
    pointer-events: none;
    position: absolute;
    display: ${props => (props.type === "dots" ? "flex" : "none")};
    opacity: 0;
    place-content: center;
    align-items: center;
  }

  .check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: ${props => (props.status === "ok" ? "block" : "none")};
    opacity: 0;
    width: ${props => props.size - 10}px;
  }
`;
