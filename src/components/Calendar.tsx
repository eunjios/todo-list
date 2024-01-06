import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useTodoListStore } from '../store/todo';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
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

const TodoDayCheck = styled.div<{ $colored: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 32%;
  cursor: pointer;
  background-color: ${(props) => (props.$colored ? '#5F8B58' : '#D9D9D9')};

  color: #fff;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TodoDayDate = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 14px;
  color: ${(props) => (props.selected ? '#FFF' : '#000')};
  background-color: ${(props) => (props.selected ? '#5983FC' : '#FFF')};
`;

export interface CalendarDate {
  fullDate: string;
  date: string | null;
  remains: number;
  length: number;
}

function TodoDay({ fullDate, date, remains, length }: CalendarDate) {
  const setDate = useTodoListStore((state) => state.setDate);
  const selectedDate = useTodoListStore((state) => state.selectedDate);

  const onDayClick = () => {
    if (fullDate !== '') {
      setDate(fullDate);
    }
  };

  return (
    <TodoDayContainer>
      {date !== '' && (
        <>
          <TodoDayCheck $colored={length - remains > 0} onClick={onDayClick}>
            {remains === 0 && length > 0 ? (
              <FaCheck />
            ) : (
              `${length !== 0 ? remains : ''}`
            )}
          </TodoDayCheck>
          <TodoDayDate selected={fullDate === selectedDate}>{date}</TodoDayDate>
        </>
      )}
    </TodoDayContainer>
  );
}

function Calendar() {
  const todoList = useTodoListStore((state) => state.todoList);
  const currentDate = new Date();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const firstDayOfWeek = firstDay.getDay();

  const calendarDates: CalendarDate[] = [];

  for (let i = 2 - firstDayOfWeek; i <= lastDay.getDate(); i += 1) {
    if (i > 0) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      );
      const dateString = date.toLocaleDateString();
      const targetTodos = todoList.find((todo) => todo.date === dateString);

      let remains = 0;
      let length = 0;
      // TODO: targetTodos.todos.length > 0
      if (targetTodos) {
        remains = targetTodos.todos.filter((todo) => !todo.done).length;
        length = targetTodos.todos.length;
      }
      calendarDates.push({
        fullDate: dateString,
        date: i.toString(),
        remains, // TODO: null 이면 숫자 X
        length,
      });
    } else {
      calendarDates.push({
        fullDate: '',
        date: null,
        remains: 0,
        length: 0,
      });
    }
  }

  return (
    <CalendarContainer>
      <CalendarDay>
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </CalendarDay>
      <CalendarGrid>
        {calendarDates.map((day) => (
          <TodoDay
            key={day.date}
            fullDate={day.fullDate}
            date={day.date}
            remains={day.remains}
            length={day.length}
          />
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
}

export default React.memo(Calendar);
