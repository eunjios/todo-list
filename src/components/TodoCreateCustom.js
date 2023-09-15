import React, { useState } from "react";
import { styled } from "styled-components";
import { useDateState, useTodoDispatch, useTodoNextId } from "../TodoContextCustom";

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 8px;
  border-bottom: 1px solid #000;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
`;

function TodoCreateCustom({ newTodo }) {
  // const selectedDate = useDateState();
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
          id: nextId,
          cateId: newTodo[1],
          text: value,
          done: false
        }
      }
    });
    setValue('');
    // setOpen(false);
    nextId.current += 1;
  }
  return (
    <InsertForm onSubmit={onSubmit}>
      <Input 
        autoFocus
        placeholder="할일"
        onChange={onChange}
        value={value}
      />
    </InsertForm>
  )
}

export default React.memo(TodoCreateCustom);