import React, { Component } from "react";
import styled from "styled-components";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TodoRemaining from "./todos/TodosRemaining";
import TodoItems from "./todos/TodoItems";
import TodoCheckAll from "./todos/TodosCheckAll";
import TodoFiltered from "./todos/TodoFiltered";
import TodosClearCompleted from "./todos/TodosClearCompleted";
import { observer, inject } from "mobx-react";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: block;
`;

const Title = styled.h1`
  text-align: center;
`;

const InputTodo = styled.input`
  width: 100%;
  display: block;
  padding: 16px 0 16px 16px;
  border: 1px solid #ebedee;
  border-radius: 4px;
  outline: none;
  font-size: 18px;
  transition: all 250ms;
  margin-bottom: 36px;

  :focus {
    -webkit-box-shadow: 4px 8px 15px 0px rgba(55, 64, 71, 0.1);
    -moz-box-shadow: 4px 8px 15px 0px rgba(55, 64, 71, 0.1);
    box-shadow: 4px 8px 15px 0px rgba(55, 64, 71, 0.1);
  }
`;

const ContainerTodoRemaining = styled.div`
  border-top: 1px solid #bec4c8
  border-bottom: 1px solid #bec4c8
  padding: 16px 0;
`;

const ContainerTodoFilter = styled.div`
  width: 100%;
  padding: 16px 0;
`;

@inject("TodoStore")
@observer
class App extends Component {
  render() {
    const TodoStore = this.props.TodoStore;

    return (
      <Container>
        <Title> React Todo Mobx </Title>
        <InputTodo
          placeholder="What needs to be done"
          type="text"
          onKeyUp={TodoStore.addTodo}
          innerRef={TodoStore.todoInput}
        />
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {TodoStore.todosFiltered.map((todo, index) => (
            <TodoItems todo={todo} key={index} index={index} />
          ))}
        </ReactCSSTransitionGroup>
        <ContainerTodoRemaining>
          <TodoCheckAll label="Check all" />
          <TodoRemaining />
        </ContainerTodoRemaining>
        <ContainerTodoFilter>
          <TodoFiltered
            updateFilter={TodoStore.updateFilter}
            filter={TodoStore.filter}
          />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {TodoStore.todoCompletedCount > 0 && (
              <TodosClearCompleted clearCompleted={TodoStore.clearCompleted} />
            )}
          </ReactCSSTransitionGroup>
        </ContainerTodoFilter>
      </Container>
    );
  }
}

export default App;
