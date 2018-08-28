import React from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";

const RemainingText = styled.p`
  display: inline-block
  float: right
  margin: 0;
`;

const TodoRemaining = inject("TodoStore")(
  observer(props => {
    return (
      <RemainingText> {props.TodoStore.remaining} Items left</RemainingText>
    );
  })
);

export default TodoRemaining;
