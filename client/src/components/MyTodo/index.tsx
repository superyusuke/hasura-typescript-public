/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";

import {
  useMyTodoSubscription,
  useInsertTodosMutation,
  useDeleteAllMyTodosMutation,
} from "src/generated/graphql";

import { LogoutBtn } from "src/components/Auth/LogoutBtn";
import { useAuth0 } from "src/components/Auth/react-auth0-spa";

import { AddFunc } from "src/components/MyTodo/AddFunc";
import { Item } from "src/components/MyTodo/Item";

import gql from "graphql-tag";

gql`
  subscription myTodo {
    todos(order_by: { created_at: desc }) {
      title
      todo_id
      is_completed
    }
  }
`;

gql`
  mutation insertTodos($title: String!) {
    insert_todos(objects: { title: $title }) {
      affected_rows
    }
  }
`;

gql`
  mutation deleteAllMyTodos {
    delete_todos(where: {}) {
      affected_rows
    }
  }
`;

export const MyTodo = () => {
  const { logout } = useAuth0();
  const { data, loading, error } = useMyTodoSubscription();
  // eslint-disable-next-line
  const [someLoading, setSomeLoading] = useState<boolean>(false);

  const [insertTodo] = useInsertTodosMutation({});
  const [deleteAllMyTodosMutation] = useDeleteAllMyTodosMutation();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return (
      <div>
        Error
        <LogoutBtn logoutHandler={logout} />
      </div>
    );
  }

  return (
    <div
      css={css`
        width: 300px;
        margin: 20px auto;
      `}
    >
      <LogoutBtn logoutHandler={logout} />
      <div onClick={() => deleteAllMyTodosMutation()}>全部削除。まじで削除</div>
      <AddFunc insertTodo={insertTodo} setSomeLoading={setSomeLoading} />
      <h2
        css={css`
          margin: 20px 0;
        `}
      >
        Just Do It
      </h2>
      {data.todos.map((o, i) => (
        <Item data={o} />
      ))}
    </div>
  );
};
