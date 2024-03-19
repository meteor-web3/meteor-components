import { css } from "@emotion/react";

import LatoBold from "@/assets/font/Lato-Bold.ttf";
import LatoExtraBold from "@/assets/font/Lato-ExtraBold.ttf";
import LatoMedium from "@/assets/font/Lato-Medium.ttf";
import LatoRegular from "@/assets/font/Lato-Regular.ttf";
import LatoSemiBold from "@/assets/font/Lato-SemiBold.ttf";
import PoppinsBold from "@/assets/font/Poppins-Bold.ttf";
import PoppinsExtraBold from "@/assets/font/Poppins-ExtraBold.woff2";
import PoppinsMedium from "@/assets/font/Poppins-Medium.ttf";
import PoppinsSemiBold from "@/assets/font/Poppins-SemiBold.woff2";
import Poppins from "@/assets/font/Poppins.ttf";

export const colors = {
  background: "#FFFFFF",
  background2: "#f6f6f6",
  accent: "#000000",
  accentOver: "#dddddd",
  accentOver2: "#000000",
  textColor: "#000000",
  textColor2: "rgba(0, 0, 0, 0.6)",
  textColor3: "rgba(0, 0, 0, 0.3)",
  pink: "rgb(166, 105, 162)",
  bg: "rgb(17, 34, 51)",
  white: "#ffffff",
  // nftbg:
  //   'linear-gradient(227.3deg, #E7FFDC 10.75%, #9D9EC4 53.2%, #7477F2 103.18%, rgba(157, 158, 196, 0) 103.18%);',
  nftbg: "#1F1F1F",
  green: "#C7F728",
  grey: "#BBB",
};

export const styles = {
  maxWidth: "1346px",
  accent: "#1890FF",
  accent2: "#e6f7ff",
  hover: "rgba(60, 90, 100, 0.04)",
  border: "rgb(217, 217, 217)",
  border2: "rgb(240, 240, 240)",
  borderRadius: "3px",
  background: "#FFFFFF",
  grey: "rgb(155,157,159)",
  textColorLight: "#D3C8D9",
  cardFilter:
    "drop-shadow(-6px -6px 12px rgba(255, 255, 255, 0.08)) drop-shadow(6px 6px 12px rgba(0, 0, 0, 0.48));",
  headerHeight: "80px",
};

export const gradientCSS = css`
  font-weight: bold;
  background-image: linear-gradient(to right, #fde8e9, #8f94bf);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const gradientCSS2 = css`
  font-weight: bold;
  background: linear-gradient(
    211.97deg,
    #ec6a76 16.29%,
    #c24cbb 30.7%,
    #824aef 46.42%,
    #6755f6 60.17%,
    #418ef7 79.16%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ellipsisCSS = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const tooltipCSS = css`
  position: absolute;
  bottom: 35px;
  left: -35px;
  z-index: 10;
  padding: 5px 10px;
  margin: auto;
  color: #fff;
  text-align: center;
  visibility: hidden;
  background-color: black;
  border-radius: 6px;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.04),
    6px 6px 12px rgba(0, 0, 0, 0.16);
  &::after {
    position: absolute;
    top: 32px;
    right: 0;
    left: 0;
    width: 10px;
    height: 10px;
    margin: auto;
    content: "";
    border-color: black transparent transparent;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    box-shadow:
      -6px -6px 12px rgba(255, 255, 255, 0.04),
      6px 6px 12px rgba(0, 0, 0, 0.16);
  }
`;

export const tooltipCSS2 = css`
  position: relative;
  z-index: 10;
  padding: 0 10px;
  margin: auto;
  color: #4b4e4f;
  text-align: center;
  white-space: nowrap;
  background-color: white;
  border-radius: 6px;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.04),
    6px 6px 12px rgba(0, 0, 0, 0.16);
  &::after {
    position: absolute;
    right: 0;
    bottom: 20px;
    left: 0;
    width: 10px;
    height: 10px;
    margin: auto;
    content: "";
    border-color: white transparent white;
    border-style: solid;
    border-width: 0 10px 10px 10px;
  }
`;

export const textareaCSS = css`
  width: 100%;
  padding-right: 8px;
  /* font-family: Jura, sans-serif; */
  font-size: 24px;
  color: rgba(211, 200, 217, 0.4);
  background: ${styles.background};
  border: none;
  outline: none;
  /* box-shadow: inset -6px -6px 12px rgb(255 255 255 / 3%), inset 6px 6px 12px rgb(0 0 0 / 18%); */
`;

export const statusButtonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  cursor: pointer;
  background: linear-gradient(
      95.04deg,
      rgba(84, 84, 84, 0.12) 3.11%,
      rgba(0, 0, 0, 0.12) 94.96%
    ),
    #ffffff;
  border: 0.481481px solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  box-shadow:
    -3.85185px -3.85185px 5.77778px rgba(255, 255, 255, 0.04),
    3.85185px 3.85185px 5.77778px rgba(0, 0, 0, 0.16);
`;

export const titleWrap = css`
  /* display: flex;
  flex-direction: column;
  flex: 1; */
  display: flex;
  font-weight: bolder;
  font-size: 18px;
  color: #000000;
  /* font-family: Jura; */
  margin-bottom: 22px;
`;

export const emojiStyle = css`
  font:
    16px/1.4 "",
    monospace;
`;

export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.3s linear;
`;

export const GlobalStyle = css`
  @font-face {
    font-family: Lato-Regular;
    font-style: normal;
    src: url(${LatoRegular});
  }
  @font-face {
    font-family: Lato-Medium;
    font-style: normal;
    src: url(${LatoMedium});
  }
  @font-face {
    font-family: Lato-SemiBold;
    font-style: normal;
    src: url(${LatoSemiBold});
  }
  @font-face {
    font-family: Lato-Bold;
    font-style: normal;
    src: url(${LatoBold});
  }
  @font-face {
    font-family: Lato-ExtraBold;
    font-style: normal;
    src: url(${LatoExtraBold});
  }
  @font-face {
    font-family: Poppins;
    font-style: normal;
    src: url(${Poppins});
  }

  @font-face {
    font-family: Poppins-Medium;
    font-style: normal;
    src: url(${PoppinsMedium});
  }

  @font-face {
    font-family: Poppins-SemiBold;
    font-style: normal;
    src: url(${PoppinsSemiBold});
  }

  @font-face {
    font-family: Poppins-Bold;
    font-style: normal;
    src: url(${PoppinsBold});
  }

  @font-face {
    font-family: Poppins-ExtraBold;
    font-style: normal;
    src: url(${PoppinsExtraBold});
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body,
  h1,
  button {
    margin: 0;
    font:
      16px/1.4 Poppins,
      monospace;
  }
  body {
    background-color: ${colors.background};
  }
  button {
    cursor: pointer;
  }
  body,
  a {
    /* color: ${colors.accent}; */
    text-decoration: none;
    outline: 0;
  }
  /* a:focus:not(:focus-visible) {
            color: ${colors.accent};
            background: transparent;
          } */
  a:focus-visible {
    color: ${colors.accentOver};
    background: ${colors.accent};
  }
  .hideScrollbar::-webkit-scrollbar {
    display: none;
  }
  input,
  textarea {
    border: none;
    outline: none;
    font-family: Poppins, sans-serif;
  }
  .swiper-container-free-mode > .swiper-wrapper {
    margin: 0 auto;
    -webkit-transition-timing-function: linear;
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
  }
  .virtuoso-grid-item {
    justify-content: center;
  }
  font-family: Poppins;
`;
