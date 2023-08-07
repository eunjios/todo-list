import React, { useReducer, createContext } from "react";

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

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, initialTodos);
  return (
    // createContext 로 사용할 값 지정하는 법 
    // 1. Provider 컴포넌트 렌더링
    // 2. value 설정
    // 3. 내부에 children 렌더링

    // 외부 컴포넌트에서 useContext 로 사용할 값 지정하는 법
    // 1. import { TodoStateContext, TodoDispatchContext }
    // 2. const state = useContext(TodoStateContext) 이런 식으로 지정
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}