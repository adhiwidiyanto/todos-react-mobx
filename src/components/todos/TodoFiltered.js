import React, { Fragment } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const ButtonFilter = styled.button`
  padding: 8px 24px;
  margin-right: 16px;
  border: none;
  background-color: #dee1e3;
  color: #374047;
  background-color: ${props => (props.active ? "#bec4c8" : "#dee1e3")}
  font-weight: 700;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #bec4c8;
  }
`;

const TodoFiltered = inject("TodoStore")(
  observer(props => {
    const TodoStore = props.TodoStore;

    return (
      <Fragment>
        <ButtonFilter
          onClick={() => TodoStore.updateFilter("all")}
          active={TodoStore.filter === "all"}
        >
          All
        </ButtonFilter>
        <ButtonFilter
          onClick={() => TodoStore.updateFilter("active")}
          active={TodoStore.filter === "active"}
        >
          Active
        </ButtonFilter>
        <ButtonFilter
          onClick={() => TodoStore.updateFilter("complete")}
          active={TodoStore.filter === "complete"}
        >
          Completed
        </ButtonFilter>
      </Fragment>
    );
  })
);

export default TodoFiltered;
