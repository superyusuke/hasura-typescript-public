import React from "react";

import { useHistory } from "react-router-dom";

export const Menu = () => {
  // eslint-disable-next-line
  const { push } = useHistory();

  return (
    <div>
      {/*<div>Menu</div>*/}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    push("/my-todo");*/}
      {/*  }}*/}
      {/*>*/}
      {/*  myTodo*/}
      {/*</button>*/}
    </div>
  );
};
