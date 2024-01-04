import React from "react";
import { DateProvider, TodoProvider } from "./TodoContextCustom";
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
      <DateProvider>
        <TodoProvider>
          <TodoProfile />
          <TodoCalendar />
          <TodoListCustom />
        </TodoProvider>
      </DateProvider>
    </>
  );
}

export default App;
