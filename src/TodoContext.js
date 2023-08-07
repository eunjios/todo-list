import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];

// === 리듀서 만들기 ===
// CREATE: todo에 항목 추가
// TOGGLE: 해당 id todo의 done을 변경
// REMOVE: 해당 id가 아닌 todo 만 필터링 (해당 id 삭제)
function TodoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done} : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// === 컨텍스트 만들기 ===
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, initialTodos);
  const nextId = useRef(5); 

  return (
    // createContext 로 사용할 값 지정하는 법 
    // 1. Provider 컴포넌트 렌더링
    // 2. value 설정
    // 3. 내부에 children 렌더링

    // 외부 컴포넌트에서 useContext 로 사용할 값 직접 지정하는 법
    // 1. import { TodoStateContext, TodoDispatchContext }
    // 2. const state = useContext(TodoStateContext) 이런 식으로 지정
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// === 커스텀 훅 만들기 ===
// 에러 처리 -> 나중에 실수 및 문제점 찾기 쉬움

// 외부 컴포넌트에서 useTodoState, useTodoDispatch 사용하는 법
// 1. import { useTodoState, useTodoDispatch }
// 2. const state = useTodoState();
//    const dispatch = useTodoDispatch();
export function useTodoState () {
  // TodoProvider로 감싸져야 함 -> 아니면 에러 처리 
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