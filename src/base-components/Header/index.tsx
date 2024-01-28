import * as React from "react";

import { SerializedStyles } from "@emotion/react";

import {
  HeaderDiv,
  Note,
  RawHeaderDiv,
  LeftBox,
  ImgLogo,
  ImgLogoTxt,
  RigBox,
  LinkBox,
  AccountTxt,
} from "./styles";
import { Avatar } from "../Avatar";

import closeIcon from "@/assets/icon/close.png";
import Logo from "@/assets/icon/logo-header.svg";

export interface HeaderProps {
  /**
   * Closeable top tip above the header
   */
  topTip?: string;
  /**
   * Whether to show the top tip by default, default is false
   */
  defaultShowTopTip?: boolean;
  /**
   * Control whether to show the top tip by yourself if needed
   */
  controlShowTopTip?: boolean;
  onClickLogo?: React.MouseEventHandler<HTMLElement>;
  /**
   * Customize right content, if not set, will show user avatar and name
   */
  customRightContent?: React.ReactNode;
  userAvatar?: string;
  userName?: string;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const Header: React.FC<HeaderProps> = ({
  topTip,
  defaultShowTopTip = false,
  controlShowTopTip,
  onClickLogo,
  customRightContent,
  userAvatar,
  userName,
  cssStyle,
  className,
  style,
}: HeaderProps) => {
  const [showNote, setShowNote] = React.useState<boolean>(defaultShowTopTip);

  React.useEffect(() => {
    if (controlShowTopTip !== undefined) {
      setShowNote(controlShowTopTip);
    }
  }, [controlShowTopTip]);

  return (
    <HeaderDiv css={cssStyle} className={className} style={style}>
      {showNote ? (
        <Note>
          {topTip}
          <img
            className='closeIcon'
            onClick={() => {
              setShowNote(false);
            }}
            src={closeIcon}
          />
        </Note>
      ) : (
        <></>
      )}
      <RawHeaderDiv>
        <LeftBox>
          <ImgLogo src={Logo} onClick={onClickLogo} />
          <ImgLogoTxt>MeteorOS</ImgLogoTxt>
        </LeftBox>
        <RigBox>
          {customRightContent || (
            <LinkBox>
              <Avatar
                avatar={userAvatar}
                isOuter
                className='header-account-avatar'
              />
              <AccountTxt>{userName}</AccountTxt>
            </LinkBox>
          )}
        </RigBox>
      </RawHeaderDiv>
    </HeaderDiv>
  );
};
