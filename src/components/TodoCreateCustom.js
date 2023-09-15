import React, { useState } from "react";
import { styled } from "styled-components";
import { useTodoDispatch, useTodoNextId } from "../TodoContextCustom";

const InsertForm = styled.form`
  padding: 0 0 8px 0;
  border-bottom: 2px solid ${props => props.color};
  transition: 0.3s;
  opacity: 0.8;
`;

const Input = styled.input`
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 18px;
`;

function TodoCreateCustom({ newTodo, color }) {
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  
  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      data: {
        date: newTodo[0],
        todo: {
          id: nextId.current,
          cateId: newTodo[1],
          text: value,
          $done: false
        }
      }
    });
    setValue('');
    nextId.current += 1;
  }
  return (
    <InsertForm 
      onSubmit={onSubmit}
      color={color}
    >
      <Input 
        key={nextId}
        autoFocus
        placeholder="입력"
        onChange={onChange}
        value={value}
      />
    </InsertForm>
  )
}

export default React.memo(TodoCreateCustom);