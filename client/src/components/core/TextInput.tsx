/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useCallback, ChangeEventHandler, Fragment } from "react";

type Props = {
  value: string;
  validationText?: string;
  isValid?: boolean;
  placeholder: string;
  onChange: (value: string) => void;
  width: string;
};

export const TextInput = (props: Props) => {
  const {
    isValid,
    placeholder,
    onChange,
    validationText,
    value,
    width,
  } = props;

  const changeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Fragment>
      <input
        css={css`
          outline: none;
          border: ${!isValid ? "none" : "1px solid #ff8b84"};
          border-radius: 4px;
          background: #f3f3f3;
          height: 47px;
          width: ${width};
          font-size: 16px;
          padding: 12px 20px;
          box-sizing: border-box;
          color: #333333;
        `}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
      />
      {isValid ? null : (
        <div
          css={css`
            color: #ff8b84;
            font-size: 14px;
            margin-top: 8px;
          `}
        >
          {validationText}
        </div>
      )}
    </Fragment>
  );
};
