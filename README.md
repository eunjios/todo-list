# TODO List
```
├── App.js
├── TodoContext.js
├── components
│   ├── TodoCreate.js
│   ├── TodoHead.js
│   ├── TodoItem.js
│   ├── TodoList.js
│   └── TodoTemplate.js
└── ... (중략) ...
```
## TodoContext
> TODO list의 상태 관리를 위한 context
- `initialTodos`: todos의 초기값

### Reducer 함수
```javascript
function TodoReducer(state, action) {
  switch (action.type) {
    case 'CREATE': // 새로운 TODO 만들기 
      return state.concat(action.todo);
    case 'TOGGLE': // 해당 id 의 item 의 done 값 toggle
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done} : todo
      );
    case 'REMOVE': // 해당 id 의 item 삭제 
      return state.filter(todo => todo.id !== action.id);
    default: // error 처리 
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
```

### Context
```javascript
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
```
```javascript
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, initialTodos); // 리듀서와 초기값 설정 
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
```
- `TodoStateContext.Provider`: state 관리 context 제공
- `TodoDispatchContext.Provider`: dispatch 관리 context 제공
- `TodoNextIdContext.Provider`: nextId 관리 context 제공

### Custom Hook
```javascript
export function useTodoState () {
  // TodoProvider로 감싸져야 함 -> 아니면 에러 처리 
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
```
- `useTodoState`: state의 context 값 추출 
- `useTodoDispatch`: dispatch의 context 값 추출 
- `useTodoNextId`: nextId의 context 값 추출 

## TodoTemplate
> TODO list의 레이아웃을 설정하는 컴포넌트

## TodoHead
> 오늘 날짜, 남은 할 일 개수를 보여주는 컴포넌트

```javascript
  <TodoHeadBlock>
    <h1>{datString}</h1>
    <div>{dayName}</div>
    <div>할 일 {undoneTasks.length}개 남음</div>
  </TodoHeadBlock>
```

**변수 정리**
- `todos`: context의 state로 받아옴
- `undoneTasks`: todos 배열의 `done` 이 false 인 것만을 필터링
- `dateString`, `dayName`: 날짜 정보

## TodoList
> TODO list의 내용 컴포넌트 

```javascript
<TodoListBlock>
  {todos.map(todo => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      text={todo.text}
      done={todo.done}
    />
  ))}
</TodoListBlock>
```

**변수 정리**
- `todos`: context의 state로 받아옴 

## TodoItem
> TODO list item의 레이아웃 설정하는 컴포넌트

```javascript
<TodoItemBlock>
  <CheckCircle>{done && <MdDone />}</CheckCircle>
  <Text>{text}</Text>
  <Remove><MdDelete /></Remove>
</TodoItemBlock>
```
**변수/함수 정리**
- `dispatch`: context의 dispatch 가져옴 
- `onToggle`: CheckCircle 누를 때 done 상태를 toggle (dispatch `TOGGLE`)
- `onRemove`: Remove 누를 때 해당 item을 삭제 (dispatch `REMOVE`)

## TodoCreate
> TODO list item을 추가하는 컴포넌트

```javascript
<>
  {open && (
    <InsertFormPositioner>
      <InsertForm>
        <Input />
      </InsertForm>
    </InsertFormPositioner>
  )}
  <CircleButton><MdAdd /></CircleButton>
</>
```
**변수/함수 정리**
- `[open, setOpen]`: useState로 input의 open 여부 관리
- `[value, setValue]`: useState로 input의 값 관리
- `dispatch`: context의 dispatch
- `nextId`: context의 nextId 사용 (배열의 다음 id)
- `onToggle`: `setOpen` 으로 `open` 값을 toggle
- `onChange`: 변경되는 값을 `value`로 설정
- `onSubmit`: dispatch의 `CREATE`로 배열에 item 추가하고 input 초기화 
