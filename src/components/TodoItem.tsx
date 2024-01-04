import React from 'react';
import { styled } from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useTodoListStore } from '../store/todo';

const TodoItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
`;

const CheckBox = styled.div<{ done: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 32%;
  color: #fff;
  font-size: 14px;
  background: ${(props) => (props.done ? props.color : '#D9D9D9')};
  cursor: pointer;
`;

const Text = styled.div`
  flex: 1;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function TodoItem({ id, done, color, text }) {
  const toggleTodo = useTodoListStore((state) => state.toggleTodo);
  const onToggle = () => toggleTodo(id);
  return (
    <TodoItemContainer>
      <CheckBox done={done} color={color} onClick={onToggle}>
        {done && <FaCheck />}
      </CheckBox>
      <Text>{text}</Text>
    </TodoItemContainer>
  );
}

export default React.memo(TodoItem);
