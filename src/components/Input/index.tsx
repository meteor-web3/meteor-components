import { useEffect, useRef, useState } from "react";

import { css, SerializedStyles } from "@emotion/react";

import { InputContainer, InputSkin, OuterSkin } from "./style";

import { checkUniqueChar, decimalPlacesLimit } from "@/utils/string";

export interface InputProps {
  /**
   * Html input type, default is text
   */
  type?: string;
  /**
   * Default or controlled value
   */
  value?: string;
  placeholder?: string;
  /**
   * Whether input is readOnly, default is false
   */
  readOnly?: boolean;
  /**
   * Whether input can be empty, default is true
   */
  canBeEmpty?: boolean;
  /**
   * Regex pattern to validate input
   */
  pattern?: string | RegExp;
  /**
   * Check whether input is positive number, default is false, only works when type is number
   */
  positive?: boolean;
  /**
   * Minimum value, only works when type is number, default is 0
   */
  min?: number;
  /**
   * Limit decimal places, only works when type is number
   */
  decimalPlaces?: number;
  /**
   * Control warning by yourself if needed
   */
  warning?: boolean;
  rootCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  className?: string;
  /**
   * Control outer skin, default is none
   */
  outerSkin?: keyof typeof OuterSkin;
  /**
   * Control input skin, default is none
   */
  inputSkin?: keyof typeof InputSkin;
  onChange?: (v: string) => void;
  onKeyDown?: (v: string) => void;
  onBlur?: (v: string) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export const Input: React.FC<InputProps> = function ({
  value,
  placeholder,
  type = "text",
  min = 0,
  readOnly = false,
  onChange,
  onKeyDown,
  onBlur,
  onClick,
  rootCss,
  inputCss,
  className,
  outerSkin,
  inputSkin,
  canBeEmpty = true,
  pattern,
  decimalPlaces,
  positive = false,
  warning,
}: InputProps) {
  const reg = pattern ? new RegExp(pattern) : undefined;
  const [currentValue, setCurrentValue] = useState(value || "");
  const [regCheck, setRegCheck] = useState(false);
  const validKey = useRef(true);

  useEffect(() => {
    if (value === undefined) return;
    onChange?.(value || "");
    setCurrentValue(value || "");
  }, [onChange, value]);

  useEffect(() => {
    if (reg) {
      setRegCheck(!!currentValue);
      if (reg) {
        setRegCheck(reg.test(currentValue));
      }
      setCurrentValue(currentValue);
      onChange?.(currentValue);
    }
  }, [reg]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number" && event.currentTarget.value !== "") {
      event.currentTarget.value = checkUniqueChar(
        event.currentTarget.value.match(/[0-9|.]+/)?.[0] || currentValue,
        ".",
      );
      if (
        decimalPlaces !== undefined &&
        !decimalPlacesLimit(event.currentTarget.value, decimalPlaces)
      ) {
        event.currentTarget.value = currentValue;
      }
    }
    if (reg) {
      setRegCheck(reg.test(event.currentTarget.value));
    }
    setCurrentValue(event.currentTarget.value);
    onChange?.(event.currentTarget.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (type === "number" && event.key === "+") ||
      event.key === "-" ||
      event.key === "e" ||
      (event.key === "." && decimalPlaces === 0)
    ) {
      validKey.current = false;
    } else {
      validKey.current = true;
      onKeyDown?.(event.currentTarget.value);
    }
  };

  const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (type === "number" && !validKey.current) {
      event.currentTarget.value = currentValue;
    }
  };

  let extraInputCss = "";
  {
    const warningStyle = "border: 1px solid #ff4d4f;";
    if (
      inputSkin === "data" &&
      ((!canBeEmpty && currentValue === "") ||
        (reg && !regCheck) ||
        (positive && !(parseFloat(currentValue) > 0)))
    ) {
      extraInputCss = warningStyle;
    }
    if (warning !== undefined && warning) {
      extraInputCss = warningStyle;
    }
  }

  return (
    <InputContainer
      outerSkin={outerSkin}
      inputSkin={inputSkin}
      rootCss={rootCss}
      inputCss={css`
        ${inputCss}
        ${extraInputCss}
      `}
      className={className}
    >
      <input
        value={currentValue}
        placeholder={placeholder}
        type={type}
        min={min}
        readOnly={readOnly}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onInput={handleOnInput}
        onBlur={event => onBlur?.(event.currentTarget.value)}
        onClick={event => onClick?.(event)}
      />
    </InputContainer>
  );
};
