/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  MyTodoSubscription,
  useUpdateToDoMutation,
} from "src/generated/graphql";
import gql from "graphql-tag";

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

type Props = {
  data: ArrayElement<MyTodoSubscription["todos"]>;
};

gql`
  mutation updateToDo($todoId: Int!, $isCompleted: Boolean!) {
    update_todos(
      _set: { is_completed: $isCompleted }
      where: { todo_id: { _eq: $todoId } }
    ) {
      affected_rows
    }
  }
`;

const DoneTag = () => {
  return (
    <span
      css={css`
        font-size: 10px;
        border: 2px springgreen solid;
        border-radius: 5px;
        height: 20px;
        padding: 2px;
        color: #10c870;
        display: flex;
        align-items: center;
      `}
    >
      Done it!
    </span>
  );
};

export const Item = (props: Props) => {
  const { data } = props;
  const { title, todo_id, is_completed } = data;

  const [completeMutation] = useUpdateToDoMutation({
    variables: {
      todoId: todo_id,
      isCompleted: !is_completed,
    },
  });

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        padding: 5px 0;
      `}
      onClick={() => completeMutation()}
    >
      {title} {is_completed ? <DoneTag /> : null}
    </div>
  );
};
