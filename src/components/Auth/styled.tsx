import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const EmbedWalletContainer = styled(motion.div)<{
  customCss?: SerializedStyles;
}>`
  width: 842px;
  height: 591px;
  border-radius: 24px;
  background-color: #fff;
  box-shadow: rgba(55, 65, 81, 0.15) 0px 8px 36px;
  display: flex;
  /* flex-direction: column; */
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;

  .wallet-list {
    width: 336px;
    padding: 21px;
    border-right: 1px solid #f2f2f2;

    .top-tip {
      text-align: left;
      padding: 0 10px 16px 10px;
      color: #232325;
      font-family: Manrope;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .tip {
      text-align: left;
      padding: 16px 10px;
      color: #8f8f8f;
      font-family: Manrope;
      font-size: 18px;
      font-weight: 400;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0px;
      gap: 8px;
      .logo {
        width: 52px;
        height: 52px;
        border-radius: 8px;
      }
      span {
        font-family: Inter-SemiBold;
        font-size: 40px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 8px;
      padding-bottom: 12px;
      gap: 2px;
      font-size: 13px;

      a {
        color: hsl(0, 0%, 57%) !important;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .connected {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 0px;
      font-size: 12px;
      line-height: 24px;
      border-top: 1px solid hsl(0, 0%, 92%);
      border-bottom: 1px solid hsl(0, 0%, 92%);
      margin-bottom: 16px;
      p {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        overflow-wrap: anywhere;
        span {
          color: hsl(0, 0%, 57%);
        }
      }
    }
  }

  .detail {
    width: 506px;
  }

  ${({ customCss }) => customCss}
`;

export const WalletListContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .wallet-item {
    width: 100%;
    line-height: 24px;
    color: #232325;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 8px 10px;
    border-radius: 16px;
    background-color: #fff;
    transition: background-color 200ms ease 0s;
    cursor: pointer;
    /* border: 1px solid hsl(0, 0%, 92%); */

    &:hover {
      background-color: #007aff;
      color: white;
    }

    &[data-disabled="true"] {
      display: none;
    }
    &[data-unavailable="true"] {
      cursor: not-allowed;
      /* background-color: #007AFF; */
      &:hover {
        background-color: #007aff;
        color: white;
      }
    }

    .wallet-logo {
      height: 28px !important;
      width: 28px !important;
      font-size: 20px !important;
      border-radius: 4px !important;
    }
  }
`;

export const DetailContainer = styled(motion.div)`
  padding: 21px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .close {
    width: 33px;
    margin-left: auto;
  }
  .title {
    color: #232325;
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 20px 0 62px;
  }
  .aggregator-box,
  .authenticator-box {
    display: flex;
    padding: 0 49px;
    .sub-title {
      color: #232325;
      font-family: Manrope;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-align: left;
    }
    .sub-description {
      color: #8f8f8f;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: left;
    }
    > img {
      padding-right: 20px;
      margin: 7px 0 auto;
    }
  }

  .learn-more {
    margin: 70px auto 0;
    width: 118px;
    height: 33px;
    border-radius: 31px;
    background: #007aff;
    color: #fff;
    text-align: center;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 33px;
    cursor: pointer;
  }
`;

export const MeteorWalletDetailContainer = styled(motion.div)`
  padding: 21px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .description {
    text-align: left;
    color: #232325;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .screenshot {
    width: 252px;
    margin: 44px auto;
  }
  .tip {
    color: #232325;
    text-align: center;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .install {
    display: flex;
    width: 210px;
    padding: 4px 17px;
    margin: 14px auto 0;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: 100px;
    background: #007aff;
    color: var(--light-white, #fff);
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 200% */
    cursor: pointer;
  }

  .innerWalletItem {
    display: flex;
    width: 419.561px;
    height: 51.585px;
    padding: 11.177px 273.36px 11.177px 20.634px;
    align-items: flex-start;
    gap: 16.335px;
    flex-shrink: 0;
    border-radius: 8.598px;
    background: #f9f9fa;
    margin-bottom: 14px;
    cursor: pointer;

    .name {
      white-space: nowrap;
      color: #404f62;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 30px; /* 171.951% */
    }
  }
`;

export const MeteorWebDetailContainer = styled(motion.div)`
  padding: 21px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .description {
    padding-bottom: 36px;
    text-align: left;
    color: #232325;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .innerWalletItem {
    display: flex;
    width: 419.561px;
    height: 51.585px;
    padding: 11.177px 273.36px 11.177px 20.634px;
    align-items: flex-start;
    gap: 16.335px;
    flex-shrink: 0;
    border-radius: 8.598px;
    background: #f9f9fa;
    margin-bottom: 14px;
    cursor: pointer;

    .name {
      white-space: nowrap;
      color: #404f62;
      font-family: Manrope;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 30px; /* 171.951% */
    }
  }
`;

export const MeteorSnapDetailContainer = styled(motion.div)`
  padding: 21px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .description {
    padding-bottom: 36px;
    text-align: left;
    color: #232325;
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`;
