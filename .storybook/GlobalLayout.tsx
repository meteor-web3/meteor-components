import { ReactNode } from "react";
import { GlobalStyle } from "../src/styles";

import { Global } from "@emotion/react";

import React from "react";

export const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <React.Fragment>
      <Global styles={GlobalStyle} />
      <main
        style={{
          fontFamily: "Poppins",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};
