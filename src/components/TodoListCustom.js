import React, { useState } from "react";
import styled from 'styled-components';
import { BsBoxFill } from 'react-icons/bs';
import { ReactComponent as PlusButton } from '../assets/PlusButton.svg';
import TodoItemCustom from "./TodoItemCustom";
import { useDateState, useTodoState } from "../TodoContextCustom";
import TodoCreateCustom from "./TodoCreateCustom";

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
`;

const TodoCategoryContainer = styled.div`
  padding: 12px 0;
`;

const TodoCategoryBlock = styled.div`
  display: inline-flex;
  padding: 10px 10px 10px 14px;
  align-items: center;
  gap: 8px;
  border-radius: 21px;
  background: #F2F2F2;

  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  color: #D9D9D9;
  cursor: pointer;
`;

const TodoCategory = styled.div`
  color: ${props => props.color};
`;

function TodoCategoryButton({ title, color, onClick }) {
  return (
    <TodoCategoryContainer>
      <TodoCategoryBlock onClick={onClick}>
        <BsBoxFill />
        <TodoCategory color={color}>{title}</TodoCategory>
        <PlusButton />
      </TodoCategoryBlock>
    </TodoCategoryContainer>
  );
}

function TodoListCustom() {
  const categories = [
    {
      id: 1,
      name: '공부',
      color: '#5F8B58'
    },
    {
      id: 2,
      name: '루틴',
      color: '#B79698'
    },
    {
      id: 3,
      name: '체크리스트',
      color: '#D5A491'
    }
  ];

  const [newTodo, setNewTodo] = useState({ selectedDate: '', cateId: 0 });
  const datas = useTodoState();
  const selectedDate = useDateState();
  const targetDatas = datas.find(data => data.date === selectedDate);

  const addTodo = (selectedDate, cateId) => {
    setNewTodo({ selectedDate, cateId });
    console.log({ selectedDate, cateId });
  }

  return (
    <TodoListContainer>
      {categories.map(category => {
        return (
          <>
          {/* 카테고리 제목 */}
          <TodoCategoryButton 
            onClick={() => addTodo(selectedDate, category.id)}
            key={category.id}
            title={category.name} 
            color={category.color} 
          />
          {/* 카테고리에 해당하는 투두리스트 */}
          {targetDatas && targetDatas.todos
            .filter(todo => todo.cateId === category.id)
            .map(todo => (
              <TodoItemCustom 
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
                color={category.color}
              />
            ))
          }
          {/* 카테고리 제목에 해당하는 새로운 투두 만드는 input */}
          {newTodo.selectedDate === selectedDate && 
          newTodo.cateId === category.id &&
            <TodoCreateCustom 
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              color={category.color}
            />
          }
          </>
        );
      })}
    </TodoListContainer>
  );
}

export default TodoListCustom;
