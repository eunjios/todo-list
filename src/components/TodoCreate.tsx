import React, { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { useTodoListStore } from '../store/todo';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0;
  }
`;

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
  color: #fff;
  font-size: 14px;
  background: #d9d9d9;
`;

const InsertForm = styled.form`
  padding: 0 0 8px 0;
  border-bottom: 2px solid ${(props) => props.color};
  opacity: 0.8;
  width: 90%; // 정확히 변경 필요

  animation-duration: 0.4s;
  animation-name: ${fadeIn};
`;

const Input = styled.input`
  padding: 0px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function TodoCreate({ newTodo, setNewTodo, color }) {
  const [value, setValue] = useState('');

  const addTodo = useTodoListStore((state) => state.addTodo);

  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo({ cateId: newTodo.cateId, text: value });
    setNewTodo({ selectedDate: '', cateId: 0 });
    setValue('');
  };
  return (
    <TodoItemContainer>
      <CheckBox />
      <InsertForm onSubmit={onSubmit} color={color}>
        <Input autoFocus placeholder="입력" onChange={onChange} value={value} />
      </InsertForm>
    </TodoItemContainer>
  );
}

export default React.memo(TodoCreate);
