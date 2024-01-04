import React from 'react';
import TodoProfile from './components/TodoProfile';
import TodoCalendar from './components/TodoCalendar';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <TodoProfile />
      <TodoCalendar />
      <TodoList />
    </>
  );
}

export default App;
