import React, { createContext, useContext, useReducer, useRef, useState } from "react";
import { todoData } from "./store/data";

// 리듀서
function TodoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      const { id } = action;
      return state.map(data => ({
        ...data,
        categories: data.categories.map(category => ({
          ...category,
          todos: category.todos.map(todo => (
            todo.id === id ? {...todo, done: !todo.done} : todo
          ))
        }))
      }));
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 컨텍스트
const DateStateContext = createContext();
const DateUpdateContext = createContext();
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function DateProvider({ children }) {
  const today = new Date().toLocaleDateString();
  const [selectedDate, setSelectedDate] = useState(today);

  const setDate = (date) => {
    setSelectedDate(date);
  }

  return (
    <DateStateContext.Provider value={selectedDate}>
      <DateUpdateContext.Provider value={setDate}>
        {children}
      </DateUpdateContext.Provider>
    </DateStateContext.Provider>
  )
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, todoData);
  const nextId = useRef(11);

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
export function useDateState() {
  const context = useContext(DateStateContext);
  if (!context) {
    throw new Error('Cannot find DateProvider');
  }
  return context;
}

export function useDateUpdate() {
  const context = useContext(DateUpdateContext);
  if (!context) {
    throw new Error('Cannot find DateProvider');
  }
  return context;
}

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
