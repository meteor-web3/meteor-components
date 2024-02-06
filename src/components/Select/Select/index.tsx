import React, { useRef, useState } from "react";

import { SerializedStyles } from "@emotion/react";

import { SelectWrap } from "./SelectWrap";

import iconDown from "@/assets/icon/down.svg";
import { Input } from "@/components/Input";
import { useClickOutside } from "@/components/Modal/hooks/useClickOutSide";
import { uuid } from "@/utils/uuid";

interface OptionProps {
  name: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  defaultOptionIdx?: number;
  options: OptionProps[];
  onChange?: (data: OptionProps) => void;
  usei18?: boolean;
  width?: string | number;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  defaultOptionIdx,
  options,
  onChange,
  usei18 = false,
  label,
  width = "100%",
  cssStyle,
  className,
  style,
}) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectIdx, setSelectIdx] = useState(defaultOptionIdx || 0);
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setSelectorVisible(false);
  });
  return (
    <SelectWrap
      haveLabel={label !== undefined}
      width={width}
      selectorVisible={selectorVisible}
      css={cssStyle}
      className={className}
      style={style}
    >
      <div
        className='selectContainer'
        onClick={(e: any) => {
          e.stopPropagation();
          setSelectorVisible(!selectorVisible);
        }}
        ref={ref}
      >
        <img src={iconDown} className='icon' />
        {label && <div className='inputLabel'>{label}</div>}
        <Input
          value={
            usei18 ? `${options[selectIdx].name}` : options[selectIdx].name
          }
          readOnly
        />
        {selectorVisible && (
          <div className='selector'>
            {options.map((option, idx) => (
              <div
                className='optionContainer'
                key={`option${uuid()}`}
                onClick={() => {
                  setSelectIdx(idx);
                  onChange?.(options[idx]);
                  setSelectorVisible(false);
                }}
              >
                {usei18 ? option.name : option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </SelectWrap>
  );
};
