const chatrooms = [
  {
    id: 1,
    title: 'Some chat 1',
  },
  {
    id: 2,
    title: 'Some chat (Empty)',
  },
];

const messages = [
  {
    id: 1,
    text: 'Hi there',
    createdAt: Date.now(),
    userId: 1,
    chatroomId: 1,
  },
  {
    id: 2,
    text: 'Hi',
    createdAt: Date.now(),
    userId: 2,
    chatroomId: 1,
  }
];

const users = [
  {
    id: 1,
    fullName: 'Ivan Ivanov',
  },
  {
    id: 2,
    fullName: 'Petr Petrov',
  },
];

export default {
  chatrooms,
  messages,
  users,
};
