import React from "react";
// import { createGlobalStyle } from "styled-components";
// import TodoTemplate from "./components/TodoTemplate";
// import TodoHead from "./components/TodoHead";
// import TodoList from "./components/TodoList";
// import TodoCreate from "./components/TodoCreate";
import { TodoProvider } from "./TodoContextCustom";
import TodoProfile from "./components/TodoProfile";
import TodoCalendar from "./components/TodoCalendar";
import TodoListCustom from "./components/TodoListCustom";

// const GlobalStyle = createGlobalStyle`
//   body {
//     background: #e9ecef;
//   }
// `;

function App() { 
  return (
    <>
      <TodoProvider>
        <TodoProfile />
        <TodoCalendar />
        <TodoListCustom />
      </TodoProvider>
      {/* <TodoProfile />
      <TodoCalendar />
      <TodoListCustom />
      <TodoProvider>
        <TodoTemplate>
          <TodoHead />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider> */}
    </>
  );
}

export default App;
