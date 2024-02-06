import { memo, useEffect, useState } from "react";

import { css, SerializedStyles } from "@emotion/react";

import { Input, Loading } from "@";
import iconDown from "@/assets/icon/down.svg";

interface Option {
  name: string;
  value: string | number | boolean;
}

export interface SelectNormalProps {
  defaultOption?: Option;
  /**
   * Option objects to select
   */
  list: Option[];
  onChange: (data: Option) => any;
  onClickOutsideFlag?: boolean;
  setOnClickOutsideFlag?: Function;
  cssStyle?: SerializedStyles;
  inputCssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
  /**
   * defaultOption有时可能并非由于用户切换下拉框而改变，做特殊判断, default is `true`
   */
  notOnlyUserTrigger?: boolean;
  showLoading?: boolean;
}

export const SelectNormal = function ({
  defaultOption,
  list,
  onChange,
  onClickOutsideFlag,
  setOnClickOutsideFlag,
  cssStyle,
  inputCssStyle,
  className,
  style,
  notOnlyUserTrigger = true,
  showLoading = false,
}: SelectNormalProps) {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [currentName, setCurrentName] = useState(
    defaultOption?.name || list[0].name,
  );
  const [currentValue, setCurrentValue] = useState(
    defaultOption?.value || list[0].value,
  );
  const [currentHover, setCurrentHover] = useState(
    defaultOption?.name || list[0].name,
  );
  const [currentIndex, setCurrentIndex] = useState(
    defaultOption?.value
      ? list.findIndex(el => el.value === defaultOption?.value)
      : 0,
  );
  const [clickIdx, setClickIdx] = useState(-1);
  const [loadingStatus, setLoadingStatus] = useState<"loading" | "ok">(
    "loading",
  );
  const [newList, setNewList] = useState<Option[]>([]);

  useEffect(() => {
    if (
      JSON.stringify(list) !==
      JSON.stringify(newList.map(el => ({ name: el.name, value: el.value })))
    ) {
      const index = defaultOption ? currentIndex : 0;
      setCurrentName(list[index]?.name);
      setCurrentValue(list[index]?.value);
      setCurrentHover(list[index]?.name);
    }
    setNewList(
      list.map((el, index) => ({
        ...el,
        checked: index === 0,
      })),
    );
  }, [list]);

  useEffect(() => {
    if (!defaultOption?.name) return;
    if (
      JSON.stringify(list) !==
        JSON.stringify(
          newList.map(el => ({ name: el.name, value: el.value })),
        ) ||
      notOnlyUserTrigger
    ) {
      setCurrentName(defaultOption?.name);
      setCurrentValue(defaultOption?.value);
      setCurrentHover(defaultOption?.name);
      setCurrentIndex(list.findIndex(el => el.value === defaultOption?.value));
    }
  }, [defaultOption]);

  useEffect(() => {
    if (onClickOutsideFlag) {
      hideSelector();
      setOnClickOutsideFlag?.(false);
    }
  }, [onClickOutsideFlag]);

  const hideSelector = () => {
    setSelectorVisible(false);
  };

  useEffect(() => {
    setLoadingStatus("loading");
  }, [clickIdx]);

  useEffect(() => {
    window.addEventListener("click", hideSelector);
    return () => {
      window.removeEventListener("click", hideSelector);
    };
  }, [selectorVisible]);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        cursor: pointer;
        ${cssStyle};
      `}
      onClick={(e: any) => {
        e.stopPropagation();
        setSelectorVisible(!selectorVisible);
      }}
      className={className}
      style={style}
    >
      <img
        src={iconDown}
        css={css`
          position: absolute;
          top: 0;
          bottom: 0;
          right: 12px;
          margin: auto;
          transform: ${selectorVisible ? "rotate(180deg)" : "0"};
          transition: all 0.3s;
        `}
      />
      <Input
        value={currentName}
        inputSkin='data'
        readOnly
        rootCss={css`
          input {
            cursor: pointer;
          }
          ${inputCssStyle}
        `}
      />
      {showLoading && (
        <Loading
          visible={clickIdx !== -1 && clickIdx === currentIndex}
          size={28}
          status={loadingStatus}
          type={"dots"}
          cssStyle={css`
            margin-left: 135px;
            margin-top: -25px;
          `}
        />
      )}

      {selectorVisible && (
        <div
          css={css`
            position: absolute;
            top: 35px;
            z-index: 1;
            width: 100%;
            background-color: #f8f7f7;
            border-radius: 8px;
            padding: 5px;
            font-size: 0.75rem;
            line-height: 0.75rem;
            cursor: pointer;
            overflow-y: auto;
            font-family: Poppins;
          `}
          className='selector'
        >
          {newList.map((el, index) => (
            <div
              key={index}
              css={css`
                display: flex;
                align-items: center;
                padding: 5px;
                border-radius: 8px;
                background-color: ${currentHover === el.name && "#eee"};
                font-family: ${currentName === el.name && "Poppins-SemiBold"};
                font-weight: ${currentName === el.name && "600"};
              `}
              onMouseEnter={() => {
                setCurrentHover(el.name);
              }}
              onClick={async () => {
                const newList2 = newList.map(el => ({ ...el, checked: false }));
                newList2[index].checked = true;
                setNewList(newList2);
                setCurrentHover(el.name);
                setCurrentName(el.name);
                setCurrentValue(el.value);
                setCurrentIndex(index);
                hideSelector();
                if (el.value !== currentValue) {
                  if (showLoading) {
                    setClickIdx(index);
                    if (await onChange({ name: el.name, value: el.value })) {
                      setLoadingStatus("ok");
                    }
                  } else {
                    onChange({ name: el.name, value: el.value });
                  }
                }
              }}
            >
              {el.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
