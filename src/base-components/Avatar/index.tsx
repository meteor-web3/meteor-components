import { useState } from "react";

import { SerializedStyles } from "@emotion/react";

import {
  AvatarContainer,
  AvatarImage,
  AvatarImagePlaceholder,
  AvatarMask,
} from "./style";

import camaraSvg from "@/assets/icon/camara.svg";
import loadingSvg from "@/assets/icon/loading.svg";
import pen_white from "@/assets/icon/pen_white.png";

export interface AvatarProps {
  /**
   * Avatar image source, should be a HTMLImageElement src
   */
  avatar?: string;
  /**
   * @deprecated default is false
   */
  isOuter?: boolean;
  /**
   * @deprecated default is false
   */
  isMiddle?: boolean;
  /**
   * Control whether to show edit icon above avatar, default is false
   */
  isInner?: boolean;
  /**
   * only works when isInner is true
   */
  imageLoading?: boolean;
  /**
   * Callback when click on the avatar
   */
  onClick?: () => void;
  /**
   * only works when isInner is true
   */
  onClickEdit?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /**
   * Custom root css styles
   */
  cssStyles?: SerializedStyles;
  /**
   * Root className
   */
  className?: string;
  /**
   * Root css styles
   */
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = function ({
  avatar,
  isOuter,
  isMiddle,
  isInner,
  imageLoading,
  onClick,
  onClickEdit,
  cssStyles,
  className,
  style,
}: AvatarProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <AvatarContainer
      isOuter={isOuter}
      isMiddle={isMiddle}
      cssStyles={cssStyles}
      className={className}
      style={style}
      onClick={e => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {avatar ? (
        <AvatarImage
          src={avatar}
          imageIsLoaded={imageIsLoaded}
          onLoad={() => {
            setImageIsLoaded(true);
          }}
        />
      ) : (
        <AvatarImagePlaceholder />
      )}
      <AvatarMask isOuter={isOuter} isMiddle={isMiddle}>
        <div className='edit' />
        <div className='container'>
          {isMiddle && (
            <>
              <img className='img-edit' src={pen_white} />
              <div>{"EDIT"}</div>
            </>
          )}
          {isInner && (
            <div className='inner' onClick={e => onClickEdit?.(e)}>
              {!imageLoading ? (
                <img src={camaraSvg} width='22px' />
              ) : (
                <img src={loadingSvg} width='26px' />
              )}
            </div>
          )}
        </div>
      </AvatarMask>
      {isOuter && <div className='outer' />}
    </AvatarContainer>
  );
};
