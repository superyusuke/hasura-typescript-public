import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Menu } from "src/components/Menu";
import { MyTodo } from "src/components/MyTodo";

export const App = () => (
  <BrowserRouter>
    <Menu />
    <Route exact path="/">
      <MyTodo />
    </Route>
  </BrowserRouter>
);
