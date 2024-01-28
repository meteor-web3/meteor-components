import { SerializedStyles } from "@emotion/react";

import { UploadCellWrap } from "./UploadCellWrap";

import loadingSvg from "@/assets/icon/loading_black.svg";
import uploadSvg from "@/assets/icon/upload2.svg";

export interface UploadCellProps {
  label?: string;
  loading?: boolean;
  width: number | string;
  height: number | string;
  showTip?: boolean;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const UploadCell: React.FC<UploadCellProps> = ({
  label,
  loading,
  width,
  height,
  showTip = true,
  cssStyle,
  className,
  style,
  onClick,
}: UploadCellProps) => {
  return (
    <UploadCellWrap
      width={width}
      height={height}
      css={cssStyle}
      className={className}
      style={style}
    >
      {label && <div className='label'>{label}</div>}
      <div className='uploadCellContainer'>
        <div
          onClick={() => {
            onClick?.();
          }}
        >
          {loading ? <img src={loadingSvg} /> : <img src={uploadSvg} />}
        </div>
        {showTip && <div className='tip'>{"upload your file"}</div>}
      </div>
    </UploadCellWrap>
  );
};
