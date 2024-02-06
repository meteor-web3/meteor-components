import React, { useEffect } from "react";

import { SerializedStyles } from "@emotion/react";
import { motion, useAnimation } from "framer-motion";

import { InnerLoadingWrap } from "./LoadingWrap";

import check from "@/assets/icon/check.svg";
import iconSpinner from "@/assets/icon/spinner_black.svg";
import { fade, show } from "@/utils/framer";

export interface LoadingProps {
  cssStyle?: SerializedStyles;
  visible?: boolean;
  spring?: boolean;
  type?: "circle" | "dots";
  status?: "loading" | "ok";
  size?: "large" | "default" | "small" | number;
  duration?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  cssStyle,
  visible = true,
  spring = false,
  type = "circle",
  status = "loading",
  size = "default",
  duration = 1,
}) => {
  const loadingMotion = useAnimation();
  const checkAnim = useAnimation();
  const seq = async () => {
    switch (status) {
      case "loading":
        loadingMotion.start(show);
        break;
      case "ok":
        await loadingMotion.start(fade);
        await checkAnim.start(show);
        await checkAnim.start(fade);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    seq();
  }, [status]);
  let sizeNumber = 30;
  if (typeof size === "string") {
    if (parseInt(size, 10).toString() === size) {
      sizeNumber = parseInt(size, 10);
    } else {
      switch (size) {
        case "default":
          sizeNumber = 30;
          break;
        case "large":
          sizeNumber = 54;
          break;
        case "small":
          sizeNumber = 22;
          break;
        default:
          sizeNumber = 30;
          break;
      }
    }
  } else {
    sizeNumber = size;
  }

  const InnerLoading = (
    <>
      <motion.div className={type} animate={loadingMotion}>
        {type === "circle" && (
          <motion.img
            animate={{
              scale: spring ? [1.01, 1.03, 1, 1.02, 1] : [1, 1, 1, 1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 50,
              repeat: Infinity,
              duration,
            }}
            src={iconSpinner}
            style={{ opacity: visible ? 1 : 0 }}
            className='iconSpinner'
          />
        )}

        {type === "dots" && (
          <>
            <motion.div
              className='dot'
              animate={{
                scaleY: [0.85, 0.8, 0.9, 0.8, 0.85],
                y: [1, 3.5, 1, -1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
              }}
              style={{ opacity: visible ? 1 : 0 }}
            />
            <motion.div
              className='dot'
              animate={{
                scaleY: [0.85, 0.8, 0.9, 0.8, 0.85],
                y: [1, 3.5, 1, -1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay: 0.2,
              }}
              style={{ x: -15, opacity: visible ? 1 : 0 }}
            />
            <motion.div
              className='dot'
              animate={{
                scaleY: [0.85, 0.8, 0.9, 0.8, 0.85],
                y: [1, 3.5, 1, -1.5, 1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay: 0.4,
              }}
              style={{ x: 15, opacity: visible ? 1 : 0 }}
            />
          </>
        )}
      </motion.div>
      <motion.img className='check' animate={checkAnim} src={check} />
    </>
  );

  return (
    <InnerLoadingWrap
      css={cssStyle}
      size={sizeNumber}
      type={type}
      status={status}
    >
      {InnerLoading}
    </InnerLoadingWrap>
  );
};
