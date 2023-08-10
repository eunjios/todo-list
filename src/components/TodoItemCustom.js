import React from "react";
import { styled } from "styled-components";
import { FaCheck } from 'react-icons/fa';

const TodoItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 32%;
  color: #FFF;
  font-size: 14px;
  background: ${props => (
    props.done ? '#5F8B58' :'#D9D9D9'
  )};
`;

const Text = styled.div`
  flex: 1;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function TodoItemCustom({ id, done, text }) {
  return (
    <TodoItemContainer>
      <CheckBox done={done}>
        {done && <FaCheck />}
      </CheckBox>
      <Text>{text}</Text>
    </TodoItemContainer>
  );
}

export default TodoItemCustom;