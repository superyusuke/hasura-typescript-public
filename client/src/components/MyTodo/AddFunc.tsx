/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, Dispatch } from "react";
import { TextInput } from "src/components/core/TextInput";
import { InsertTodosMutationFn } from "src/generated/graphql";

type Props = {
  insertTodo: InsertTodosMutationFn;
  setSomeLoading: Dispatch<boolean>;
};

export const AddFunc = (props: Props) => {
  const { insertTodo, setSomeLoading } = props;
  const [text, setText] = useState<string>("");

  const clickHandler = async () => {
    setText("");
    setSomeLoading(true);
    await insertTodo({
      variables: {
        title: text,
      },
    });
    setSomeLoading(false);
  };

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <TextInput
        width={"100%"}
        value={text}
        placeholder={""}
        onChange={setText}
      />
      <div
        onClick={clickHandler}
        css={css`
          border-radius: 4px;
          display: flex;
          align-items: center;
          border: 1px solid black;
          padding: 0 20px;
          margin-left: 4px;
          cursor: pointer;
          &:hover {
            background: #f3f3f3;
          }
        `}
      >
        Add
      </div>
    </div>
  );
};
