import React from "react";
import styled from 'styled-components';
import { BsBoxFill } from 'react-icons/bs';
import { ReactComponent as PlusButton } from '../assets/PlusButton.svg';
import TodoItemCustom from "./TodoItemCustom";

const todos = [
  {
    id: 1,
    text: 'UI/UX 디자인 완료',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 만들기',
    done: true,
  },
  {
    id: 3,
    text: '기능 구현하기',
    done: false,
  },
  {
    id: 4,
    text: '상태관리',
    done: false,
  },
]

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
  return (
    <TodoListContainer>
      <TodoCategoryButton title="공부" color="#5F8B58"/>
      {todos.map(todo => (
        <TodoItemCustom 
          key={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
      <TodoCategoryButton title="루틴" color="#F38D7F"/>
    </TodoListContainer>
  );
}

export default TodoListCustom;
