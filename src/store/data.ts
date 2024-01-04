export const categories = [
  {
    id: 1,
    name: '공부',
    color: '#5F8B58',
  },
  {
    id: 2,
    name: '루틴',
    color: '#B79698',
  },
  {
    id: 3,
    name: '체크리스트',
    color: '#D5A491',
  },
];

export const todoData = [
  {
    date: '2024. 1. 11.',
    todos: [
      {
        id: '1',
        cateId: 1,
        text: '투두 데이터 만들기',
        done: true,
      },
      {
        id: '2',
        cateId: 1,
        text: '투두 추가 버튼 만들기',
        done: false,
      },
      {
        id: '3',
        cateId: 2,
        text: '아침 7시 기상',
        done: true,
      },
      {
        id: '4',
        cateId: 2,
        text: '아침 요가',
        done: true,
      },
      {
        id: '5',
        cateId: 2,
        text: '물 1리터 마시기',
        done: false,
      },
      {
        id: '6',
        cateId: 3,
        text: '과제 제출 14:00',
        done: true,
      },
    ],
  },
  {
    date: '2024. 1. 10.',
    todos: [
      {
        id: '7',
        cateId: 1,
        text: '알고리즘 공부',
        done: false,
      },
      {
        id: '8',
        cateId: 1,
        text: 'JavaScript 공부',
        done: true,
      },
      {
        id: '9',
        cateId: 2,
        text: '아침 7시 기상',
        done: true,
      },
      {
        id: '10',
        cateId: 2,
        text: '웨이트 등 운동',
        done: true,
      },
    ],
  },
  {
    date: '2024. 1. 9.',
    todos: [
      {
        id: '11',
        cateId: 1,
        text: '알고리즘 공부',
        done: false,
      },
      {
        id: '12',
        cateId: 1,
        text: 'JavaScript 공부',
        done: false,
      },
      {
        id: '13',
        cateId: 2,
        text: '아침 7시 기상',
        done: false,
      },
      {
        id: '14',
        cateId: 3,
        text: '그릭요거트 구매',
        done: false,
      },
    ],
  },
];
