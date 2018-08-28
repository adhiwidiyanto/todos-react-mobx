import React from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const TodoItem = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 24px;

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

const TodoChecked = styled.input`
  margin-right: 16px;
  cursor: pointer;
`;

const TodoTitle = styled.h3`
  font-family: sans;
  display: inline-block;
  margin: 0;
  text-decoration: ${props => (props.completed ? "line-through" : "")};
  color: ${props => (props.completed ? "#97a1a7" : "#374047")};
`;

const EditTodo = styled.input`
  width: 50%;
  display: inline-block;
  padding: 16px 0 16px 16px;
  border: 1px solid #ebedee;
  border-radius: 4px;
  outline: none;
  font-size: 18px;
`;

const TodoRemove = styled.div`
  cursor: pointer;
  display: inline-block;
  float: right;
  font-size: 18px;
  color: #7f8a93;
`;

const TodoItems = inject("TodoStore")(
  observer(props => {
    const TodoStore = props.TodoStore;

    return (
      <TodoItem key={props.index}>
        <TodoChecked
          type="checkbox"
          onChange={event =>
            TodoStore.checkTodo(props.todo, props.index, event)
          }
          checked={props.todo.completed}
        />
        {!props.todo.editing && (
          <TodoTitle
            completed={props.todo.completed}
            onDoubleClick={event =>
              TodoStore.editTodo(props.todo, props.index, event)
            }
          >
            {props.todo.title}
          </TodoTitle>
        )}

        {props.todo.editing && (
          <EditTodo
            autoFocus
            defaultValue={props.todo.title}
            onBlur={event => TodoStore.doneEdit(props.todo, props.index, event)}
            onKeyUp={event => {
              if (event.key === "Enter") {
                TodoStore.doneEdit(props.todo, props.index, event);
              } else if (event.key === "Escape") {
                TodoStore.cancelEdit(props.todo, props.index, event);
              }
            }}
          />
        )}
        <TodoRemove onClick={event => TodoStore.deleteTodo(props.index)}>
          &times;
        </TodoRemove>
      </TodoItem>
    );
  })
);

export default TodoItems;
