import React from 'react';
import { styled } from 'styled-components';

const ProfileContainer = styled.div`
  display: inline-flex;
  padding: 26px;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const PictureCircle = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #d9d9d9;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const UserName = styled.div`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const UserMessage = styled.div`
  color: #525252;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function TodoProfile() {
  return (
    <ProfileContainer>
      <PictureCircle />
      <ProfileInfo>
        <UserName>은지</UserName>
        <UserMessage>프로필에 자기소개를 입력해보세요</UserMessage>
      </ProfileInfo>
    </ProfileContainer>
  );
}

export default TodoProfile;
