import styled from "@emotion/styled";

export const ButtonWrap = styled.div<{
  loading?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #000000;
  img {
    width: 26px;
    vertical-align: middle;
  }

  .container {
    display: ${props => (props.loading ? "none" : "flex")};
    align-items: center;
    justify-content: center;
  }
`;
