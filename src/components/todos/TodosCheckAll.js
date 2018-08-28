import React, { Fragment } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const TodoChecked = styled.input`
  margin-right: 16px;
  cursor: pointer;
`;

const TodoCheckAll = inject("TodoStore")(
  observer(props => {
    const TodoStore = props.TodoStore;

    return (
      <Fragment>
        <TodoChecked
          type="checkbox"
          onChange={TodoStore.checkAllTodos}
          checked={!TodoStore.anyRemaining}
        />
        {props.label}
      </Fragment>
    );
  })
);

export default TodoCheckAll;
