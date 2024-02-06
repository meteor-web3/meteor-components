import { useEffect, useState } from "react";

import { css, SerializedStyles } from "@emotion/react";

export interface ReadMoreProps {
  /**
   * The number of lines to show, default is `5`
   */
  line?: number;
  /**
   * Whether to show the read more button, default is `false`
   */
  showReadMore?: boolean;
  /**
   * The text content
   */
  content: string;
  /**
   * Custom css style
   */
  cssStyle: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const ReadMore: React.FC<ReadMoreProps> = function ({
  line = 5,
  showReadMore = false,
  content,
  cssStyle,
  className,
  style,
}: ReadMoreProps) {
  const [isFold, setIsFold] = useState(false);
  const [foldVisible, setFoldVisible] = useState(false);

  useEffect(() => {
    if (content) {
      const arr = content.match(/\n/g);
      if (content.length >= 194 || (arr && arr.length >= 3)) {
        setIsFold(true);
        setFoldVisible(true);
      } else {
        setIsFold(false);
        setFoldVisible(false);
      }
    }
  }, [content]);

  return (
    <div css={cssStyle} className={className} style={style}>
      <div
        id='content'
        css={css`
          display: -webkit-box;
          overflow: hidden;
          font-family: Poppins;
          font-size: 14px;
          line-height: 21px;
          color: #000000;
          opacity: 0.6;
          text-overflow: ellipsis;
          white-space: pre-line;
          -webkit-line-clamp: ${isFold ? line : "none"};
          -webkit-box-orient: vertical;
        `}
      >
        {content}
      </div>
      <span
        id='readMore'
        css={css`
          display: ${showReadMore && foldVisible ? "inline" : "none"};
          font-size: 14px;
          /* color: #d3c8d9; */
          font-family: Poppins-SemiBold;
          color: #000000;
          cursor: pointer;
        `}
        onClick={() => {
          setIsFold(!isFold);
        }}
      >
        {isFold ? "Read more" : "Fold"}
      </span>
    </div>
  );
};
