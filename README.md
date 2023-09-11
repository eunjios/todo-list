# Todo List
> 아직 미완성인 프로젝트 입니다. 목표는 투두메이트 비슷하게 만들기! 🚀 

<img width="480" alt="preview" src="https://github.com/eunjios/todo-list/assets/77034159/16ff1128-9296-4708-9f97-c8b19e5755a7">
<img width="480" alt="preview" src="https://github.com/eunjios/todo-list/assets/77034159/7d1f4757-4cb1-4ea4-b930-a0fa2f2d510d">


## Architecture
```
├── App.js
├── TodoContext.js
├── store
│   └── data.js
├── components
│   ├── Calendar.js
│   ├── TodoCalendar.js
│   ├── TodoItemCustom.js
│   ├── TodoListCustom.js
│   └── TodoProfile.js
└── ... (중략) ...
```

## data
```js
const categories: {
    id: number;
    name: string;
    color: string;
}[]
```
```js
const todoData: {
    date: string;
    todos: {
        id: number;
        cateId: number;
        text: string;
        done: boolean;
    }[];
}[]
```

## TodoContextCustom
> TODO list의 상태 관리를 위한 context

### Toggle
```js
// 리듀서 정의 
// ...
case 'TOGGLE':
  const { id } = action;
  return state.map(data => ({
    ...data,
    todos: data.todos.map(todo => (
      todo.id === id ? {...todo, done: !todo.done} : todo
    ))
  }))
```

### Context
- `DateProvider`: 선택한 날짜 관련 컨텍스트 제공
- `TodoProvider`: 투두리스트 관련 컨텍스트 제공
```javascript
// DateProvider
const today = new Date().toLocaleDateString();
const [selectedDate, setSelectedDate] = useState(today);

const setDate = (date) => {
  setSelectedDate(date);
}
```
```javascript
// TodoProvider
const [state, dispatch] = useReducer(TodoReducer, todoData);
const nextId = useRef(15);
```

### Custom Hook
- `useDateState`: selectedDate의 context 값 추출
- `useDateUpdate`: setDate의 context 값 추출
- `useTodoState`: state의 context 값 추출 
- `useTodoDispatch`: dispatch의 context 값 추출 
- `useTodoNextId`: nextId의 context 값 추출 


## TodoProfile
> 유저 정보를 보여주는 컴포넌트

- 아직 하드 코딩되어 있지만 추후 업데이트 예정

```javascript
return (
  <ProfileContainer>
    <PictureCircle />
    <ProfileInfo>
      <UserName>은지</UserName>
      <UserMessage>프로필에 자기소개를 입력해보세요</UserMessage>
    </ProfileInfo>
  </ProfileContainer>
);
```

## TodoCalendar
> 달력 전체 부분

```javascript
return (
  <>
  <CalendarHeadContainer>
    // ... 중략
  </CalendarHeadContainer>
  <Calendar />
  </>
);
```
- `CalendarHeadContainer` : 이번 달 done의 개수 (지금은 하드 코딩된 상태)
- `Calendar` : 달력 레이아웃

### Calendar
```js
<TodoDayCheck 
  $remains={remains} 
  $length={length} 
  onClick={onDayClick}
>
  {remains === 0 && length > 0 ? 
    <FaCheck /> : 
    `${length !== 0 ? remains : ''}`
  }
</TodoDayCheck>
<TodoDayDate>{date}</TodoDayDate>
```
- `length` : 해당 날짜의 총 할 일 개수
- `remains` : 해당 날짜의 남아있는 할 일 개수



## TodoListCustom
> TODO list item의 레이아웃 설정하는 컴포넌트

- 카테고리 별로 투두리스트 렌더링
- 아이템 클릭시 `TOGGLE`을 통해 done 상태 변경
- 카테고리 버튼 클릭시 투두리스트 추가 예정

```javascript
{categories.map(category => {
  return (
    <>
    <TodoCategoryButton
      key={category.id}
      title={category.name} 
      color={category.color} 
    />
    {targetDatas && targetDatas.todos
      .filter(todo => todo.cateId === category.id)
      .map(todo => (
        <TodoItemCustom 
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          color={category.color}
        />
      ))
    }
    </>
  );
})}
```


## TodoCreate
> TODO list item을 추가하는 컴포넌트
- 아직 미완성 상태 
