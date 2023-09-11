import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useTodoState } from '../TodoContextCustom';
import { useDateState, useDateUpdate } from '../TodoContextCustom';

const days = ["월", "화", "수", "목", "금", "토", "일"];

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarDay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px;
  color: #525252;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const TodoDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
`;

const TodoDayCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 32%;
  cursor: pointer;
  background-color: ${props => 
    (props.$remains !== 0 ? '#5F8B58' : '#D9D9D9')
  };

  /* 
  TODO:

  할 일 하나도 안 했으면 -> background: #D9D9D9; 
  할 일 하나라도 했으면 -> background: #5F8B58;
  
  <div>{남아 있는 할 일 개수}<div>
  {남아 있는 할 일 개수} 가 0 이면 -> check 표시 
  */
  color: #FFF;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TodoDayDate = styled.div`
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

function TodoDay({ fullDate, date, remains }) {
  const setDate = useDateUpdate();
  const onDayClick = () => {
    if (fullDate !== '') {
      setDate(fullDate);
    }
    console.log(fullDate);
  }
  return (
    <TodoDayContainer>
      {date !== '' && (
        <>
          <TodoDayCheck $remains={remains} onClick={onDayClick}>
            {remains === 0 ? <FaCheck /> : `${remains}`}
          </TodoDayCheck>
          <TodoDayDate>{date}</TodoDayDate>
        </>
      )}
    </TodoDayContainer>
  )
};

const Calendar = () => {
  const todos = useTodoState();
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDay.getDay();

  const calendarDates = [];
  console.log('firstDay', firstDay);
  console.log('lastDay', lastDay);
  for (let i = 2 - firstDayOfWeek; i <= lastDay.getDate(); i++) {
    if (i > 0) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toLocaleDateString();
      const targetTodos = todos.find(todo => todo.date === dateString);

      let remains = 0;
      if(targetTodos) {
        remains = 0;
        targetTodos.categories.forEach(category => {
          category.todos.forEach(todo => {
            if (!todo.done) remains++;
          })
        })
      }
      console.log(remains);
      calendarDates.push({
        fullDate: dateString,
        date: i,
        remains: remains, // TODO: null 이면 숫자 X
      });
    } else {
      calendarDates.push({fullDate: '', date: '', remains: 0});
    }
  }

  return (
    <CalendarContainer>
      <CalendarDay>
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </CalendarDay>
      <CalendarGrid>
        {calendarDates.map((day, index) => (
          <TodoDay 
            key={index} 
            fullDate = {day.fullDate}
            date={day.date} 
            remains={day.remains} 
          />
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
