import React from 'react';
import { styled } from 'styled-components';
import { MdArrowBackIos, MdArrowForwardIos, MdCheckBox } from 'react-icons/md';
import { IoHeart } from 'react-icons/io5';
import Calendar from './Calendar';

const CalendarHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26px;
`;

const CalendarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CalendarDate = styled.p`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CalendarDone = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CalendarArrow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 13px;
`;

function TodoCalendar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const text = `${year}년 ${month}월`;
  return (
    <>
      <CalendarHeadContainer>
        <CalendarInfo>
          <CalendarDate>{text}</CalendarDate>
          <CalendarDone>
            <MdCheckBox color="#8F8F8F" />
            <span>27</span>
          </CalendarDone>
          <CalendarDone>
            <IoHeart color="#DD2E44" />
            <span>52</span>
          </CalendarDone>
        </CalendarInfo>
        <CalendarArrow>
          <MdArrowBackIos />
          <MdArrowForwardIos />
        </CalendarArrow>
      </CalendarHeadContainer>
      <Calendar />
    </>
  );
}

export default TodoCalendar;
