import { memo, ReactNode } from "react";

import { css, SerializedStyles } from "@emotion/react";
import ReactDOM from "react-dom";

import iconInfo from "@/assets/icon/blackInfo.svg";
import iconCheck from "@/assets/icon/greenCheck.svg";
import iconWarning from "@/assets/icon/redError.svg";
import { BottomTabBar } from "@/base-components/BottomTabBar";

export enum MessageTypes {
  Success = "Success",
  Info = "Info",
  Error = "Error",
}

export interface MessageProps {
  content: string | JSX.Element;
  actions?: ReactNode;
  type?: MessageTypes;
  /**
   * The duration of message showing, default is `3000`, means bar will be closed after 3 seconds
   */
  duration?: number;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

const MessageBottomComp = memo(function MessageBottomComp({
  content,
  actions,
  type,
  cssStyle,
  className,
  style,
}: MessageProps) {
  return (
    <BottomTabBar
      cssStyle={cssStyle}
      className={className}
      style={style}
      defaultVisible={true}
      modalId='MessageTip'
      icon={
        <img
          src={
            type === MessageTypes.Error
              ? iconWarning
              : type === MessageTypes.Info
              ? iconInfo
              : iconCheck
          }
          css={css`
            width: 36px;
            height: 36px;
            margin-left: 3px;
          `}
        />
      }
      tips={
        <div>
          <div
            css={css`
              font-family: Poppins-Bold;
              font-weight: 700;
              font-size: 1rem;
              line-height: 1.5rem;
              color: ${type === MessageTypes.Error
                ? "#CB2424"
                : type === MessageTypes.Info
                ? " #000000"
                : "#48A92F"};
            `}
          >
            {content}
          </div>
        </div>
      }
      actions={actions}
    />
  );
});

export const message = (props: MessageProps) => {
  const holder = document.createElement("div");
  holder.setAttribute("id", "meteorMessageBox");
  document.body.append(holder);
  const destroy = () => {
    holder.remove();
  };

  setTimeout(() => {
    destroy();
  }, props.duration || 3000);

  holder.addEventListener("click", () => {
    holder.remove();
  });

  ReactDOM.render(<MessageBottomComp {...props} />, holder);
};

message.info = (content: string | JSX.Element) => {
  message({ content, type: MessageTypes.Info });
};

message.success = (content: string | JSX.Element) => {
  message({ content, type: MessageTypes.Success });
};

message.error = (content: string | JSX.Element) => {
  message({ content, type: MessageTypes.Error });
};
