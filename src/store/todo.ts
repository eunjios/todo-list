import { create } from 'zustand';
import uuid from 'react-uuid';
import { todoData } from './data';

export type TodoItemModel = {
  id: string;
  cateId: number;
  text: string;
  done: boolean;
};

export type TodoListModel = {
  date: string;
  todos: TodoItemModel[];
};

type TodoListStore = {
  todoList: TodoListModel[];
  selectedDate: string;
  setDate: (date: string) => void;
  addTodo: (todo: Omit<TodoItemModel, 'id' | 'done'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const useTodoListStore = create<TodoListStore>((set) => ({
  todoList: todoData,
  selectedDate: new Date().toLocaleDateString(),
  setDate: (date) => set((state) => ({ ...state, selectedDate: date })),
  addTodo: (todo) =>
    set((state) => {
      const selected = state.todoList.find(
        (data) => data.date === state.selectedDate,
      );
      if (selected) {
        return {
          ...state,
          todoList: state.todoList.map((data) => {
            if (data.date === state.selectedDate) {
              return {
                ...data,
                todos: [...data.todos, { id: uuid(), done: false, ...todo }],
              };
            }
            return data;
          }),
        };
      }
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            date: state.selectedDate,
            todos: [{ id: uuid(), done: false, ...todo }],
          },
        ],
      };
    }),
  toggleTodo: (id) =>
    set((state) => ({
      ...state,
      todoList: state.todoList.map((data) => ({
        ...data,
        todos: data.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo,
        ),
      })),
    })),
  deleteTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todoList.map((data) => {
        if (data.date === state.selectedDate) {
          return {
            ...data,
            todos: data.todos.filter((todo) => todo.id !== id),
          };
        }
        return data;
      });
      return { ...state, todoList: updatedTodos };
    }),
}));
