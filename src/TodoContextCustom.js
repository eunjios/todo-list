import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: 'UI/UX 디자인',
    done: true,
    color: '#5F8B58',
  },
  {
    id: 2,
    text: '컴포넌트 만들기',
    done: true,
    color: '#5F8B58',
  },
  {
    id: 3,
    text: 'context 만들기',
    done: false,
    color: '#5F8B58',
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
    color: '#5F8B58',
  },
];

// 리듀서
function TodoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo => 
        todo.id === action.id ? {...todo, done: !todo.done} : todo  
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 컨텍스트
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// 커스텀 훅
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
