import styled from "@emotion/styled";

export const DividerContainer = styled.div<{
  space: number;
  width: string | number;
}>`
  position: relative;
  width: ${props =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
  height: 1px;
  margin: ${props => props.space}px auto;
`;

export const DividerNormal = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background: #d7d7d7;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;
