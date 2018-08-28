import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "mobx-react";
import TodoStore from "./stores/todoStores";

const Root = (
  <Provider TodoStore={TodoStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
