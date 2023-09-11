import React from "react";
import styled from 'styled-components';
import { BsBoxFill } from 'react-icons/bs';
import { ReactComponent as PlusButton } from '../assets/PlusButton.svg';
import TodoItemCustom from "./TodoItemCustom";
import { useTodoState } from "../TodoContextCustom";

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
`;

const TodoCategory = styled.div`
  color: ${props => props.color};
`;

function TodoCategoryButton({ title, color }) {
  return (
    <TodoCategoryContainer>
      <TodoCategoryBlock>
        <BsBoxFill />
        <TodoCategory color={color}>{title}</TodoCategory>
        <PlusButton />
      </TodoCategoryBlock>
    </TodoCategoryContainer>
  );
}

function TodoListCustom() {
  const todos = useTodoState();
  const targetTodos = todos.filter(todo => todo.date === '2023. 9. 11.'); // TODO: targetDate
  return (
    <TodoListContainer>
      {targetTodos.map(data => (
        <>
          {data.categories.map(category => (
            <>
            <TodoCategoryButton 
              title={category.name} 
              color={category.color} 
            />
            {category.todos.map(todo => (
              <TodoItemCustom 
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
                color={category.color}
              />
            ))}
            </>
          ))}
        </>
      ))}
    </TodoListContainer>
  );
}

export default TodoListCustom;
