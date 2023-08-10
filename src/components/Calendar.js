import React from 'react';
import styled from 'styled-components';

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
  font-family: Inter;
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
  padding: 10px;
`;

const TodoDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px;
`;

const TodoDayCheck = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 28%;
  background-color: #D9D9D9;

  /* 
  TODO:

  할 일 하나도 안 했으면 -> background: #D9D9D9; 
  할 일 하나라도 했으면 -> background: #5F8B58;
  
  <div>{남아 있는 할 일 개수}<div>
  {남아 있는 할 일 개수} 가 0 이면 -> check 표시 
  */

`;

const TodoDayDate = styled.div`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Calendar = () => {
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDay.getDay();

  const calendarDates = [];
  for (let i = 1 - firstDayOfWeek; i <= lastDay.getDate(); i++) {
    if (i > 0) {
      calendarDates.push(i);
    } else {
      calendarDates.push('');
    }
  }

  return (
    <CalendarContainer>
      {/* 요일 */}
      <CalendarDay>
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </CalendarDay>
      <CalendarGrid>
        {calendarDates.map((date, index) => (
          <TodoDay key={index}>
            {date !== '' && (
              <>
                <TodoDayCheck />
                <TodoDayDate>{date}</TodoDayDate>
              </>
            )}
          </TodoDay>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
