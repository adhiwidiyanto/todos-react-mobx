import React, { Fragment } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const ButtonClear = styled.button`
  padding: 8px 0;
  border: none;
  color: #374047;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  float: right

  :hover {
    text-decoration: underline;
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  &.fade-leave {
    opacity: 1;
  }

  &.fade-leave-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }
`;

const TodosClearCompleted = inject("TodoStore")(
  observer(props => {
    const TodoStore = props.TodoStore;

    return (
      <Fragment>
        <ButtonClear onClick={props.clearCompleted}>
          Clear completed
        </ButtonClear>
      </Fragment>
    );
  })
);

export default TodosClearCompleted;
