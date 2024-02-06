import { SerializedStyles } from "@emotion/react";

import { skinMap, SmallButtonContainer } from "./style";

import loadingSvg from "@/assets/icon/loading_black.svg";

export interface SmallButtonProps {
  /**
   * whether the image is loading, only works when srcType is image
   */
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * the content of the button, can be image src or text
   */
  content: string;
  /**
   * the type of the content
   */
  contentType?: "font" | "diy" | "image";
  /**
   * the tip of the button, will show when hover
   */
  tip: string;
  skin?: keyof typeof skinMap | "default";
  /**
   * whether the button is borderless, default is false
   */
  borderless?: boolean;
  /**
   * customize the style of the button if needed
   */
  cssStyle?: SerializedStyles;
  /**
   * the className of the button
   */
  className?: string;
  /**
   * the style of the button
   */
  style?: React.CSSProperties;
}

export const SmallButton = function ({
  loading,
  onClick,
  content,
  contentType = "image",
  tip,
  skin = "default",
  borderless = false,
  cssStyle,
  className,
  style,
}: SmallButtonProps) {
  return (
    <SmallButtonContainer
      borderless={borderless}
      skin={skin}
      cssStyle={cssStyle}
      className={className}
      style={style}
      onClick={onClick}
    >
      {contentType === "font" ? (
        <text className='small-button-font'>{content}</text>
      ) : contentType === "diy" ? (
        <div className='diy'>{content}</div>
      ) : (
        <img src={content} style={{ display: loading ? "none" : "block" }} />
      )}
      <img src={loadingSvg} style={{ display: loading ? "block" : "none" }} />
      <div className='tip'>
        <span>{tip}</span>
      </div>
    </SmallButtonContainer>
  );
};
