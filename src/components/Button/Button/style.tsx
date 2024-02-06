import styled from "@emotion/styled";

export const ButtonContainerWrap = styled.div<{
  minWidth: number | string;
  type: string;
}>`
  // default
  .button {
    cursor: pointer;
    appearance: auto;
    user-select: none;
    white-space: pre;
    text-align: center;
    box-sizing: border-box;
    background-color: buttonface;
    color: buttontext;
    border: none;
    border-radius: 6px;
    white-space: nowrap;
    height: 32px;
    padding: 4px 15px;
    width: fit-content;
    min-width: ${props =>
      typeof props.minWidth === "number"
        ? `${props.minWidth}px`
        : props.minWidth};

    // primary
    ${props =>
      props.type === "primary"
        ? "color: rgb(255, 255, 255); background-color:rgb(0, 0, 0);"
        : ""}

    // text
    ${props =>
      props.type === "text"
        ? "color: rgb(0, 0, 0); background-color:rgba(0, 0, 0, 0);"
        : ""}
        
    // icon
    ${props =>
      props.type === "icon" &&
      `
      width: 1.75rem;
      height: 1.75rem;
      min-width: 1.75rem;
      border: none;
      padding: 0;
    `}

    // gray
    ${props =>
      props.type === "gray" &&
      `
      background-color: #f8f7f7;
      padding: 0;
      height: 30px;
      border-radius: 6px;
    `}

    transition: box-shadow 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      ${props =>
        props.type !== "text"
          ? `box-shadow: 0px 0px 3px #333333;
          -webkit-box-shadow: 0px 0px 3px #333333;
          box-shadow: 0px 0px 3px #333333;`
          : ""}
    }
  }
`;
