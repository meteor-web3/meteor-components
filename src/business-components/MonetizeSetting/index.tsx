import { useEffect, useState } from "react";

import { css } from "@emotion/react";

import { ItemWrapper, Title, Wrapper } from "./styled";

import { CheckBox, Input, Select } from "@/base-components";

export interface MonetizeSettingProps {
  onChange?: (
    data: {
      amount: number;
      currency: string;
      limit: number;
    },
    valid: boolean,
  ) => void;
}

const amountReg = new RegExp("^([0-9][0-9]*)+(.[0-9]{1,17})?$");

export const MonetizeSetting: React.FC<MonetizeSettingProps> = ({
  onChange,
}: MonetizeSettingProps) => {
  const [currency, setCurrency] = useState({
    name: "WMATIC",
    value: "WMATIC",
  });
  const [amount, setAmount] = useState("");
  const [limit, setLimit] = useState("");
  const [checked, setChecked] = useState(false);
  const [inputWarn, setInputWarn] = useState(false);
  const isInputValid = () => {
    const isValid =
      amount !== "" &&
      ((limit !== "" && !checked) || checked) &&
      amountReg.test(amount) &&
      parseFloat(amount) > 0 &&
      (checked || parseFloat(limit) > 0);
    return isValid;
  };

  const handleValueChange = () => {
    const valid = isInputValid();
    if (!valid) {
      setInputWarn(true);
    }
    onChange?.(
      {
        currency: currency.value,
        amount: parseFloat(amount),
        limit: checked ? 2 ** 52 : parseFloat(limit),
      },
      valid,
    );
  };

  useEffect(handleValueChange, [currency, amount, limit, checked]);

  return (
    <Wrapper>
      <Title>Price</Title>
      <ItemWrapper>
        <Input
          value={amount}
          type='number'
          rootCss={css`
            width: auto !important;
          `}
          canBeEmpty={!inputWarn}
          onChange={(val: string) => {
            setAmount(val);
          }}
          positive={inputWarn}
          pattern={inputWarn ? amountReg : undefined}
          placeholder={`e.g. 20`}
          decimalPlaces={17}
        />
        <Select
          defaultOptionIdx={0}
          options={[
            {
              name: "WMATIC",
              value: "WMATIC",
            },
            {
              name: "WETH",
              value: "WETH",
            },
            {
              name: "USDC",
              value: "USDC",
            },
            {
              name: "DAI",
              value: "DAI",
            },
          ]}
          onChange={data => {
            setCurrency(data);
          }}
          cssStyle={css`
            margin-left: 6px;
          `}
          width={135}
        />
      </ItemWrapper>
      <Title>Maximum Supply</Title>
      <ItemWrapper>
        <Input
          value={limit}
          type='number'
          rootCss={css`
            width: auto !important;
          `}
          canBeEmpty={checked || !inputWarn ? true : false}
          positive={inputWarn && !checked}
          placeholder={`eg 20`}
          onChange={value => {
            setLimit(value);
            value && setChecked(false);
          }}
          decimalPlaces={0}
        />
        <CheckBox
          controlChecked={checked}
          onChange={checked => {
            setChecked(checked);
            if (checked) {
              setLimit("");
            }
          }}
          label={"Unlimited"}
        />
      </ItemWrapper>
      <ItemWrapper>
        <div className='tip'>
          Data Monetization is on Mumbai. Testnet Matic faucet
          <a
            href={process.env.MUMBAI_FAUCET}
            target='_blank'
            className='link'
            rel='noreferrer'
          >
            here
          </a>
          .
        </div>
      </ItemWrapper>
    </Wrapper>
  );
};
