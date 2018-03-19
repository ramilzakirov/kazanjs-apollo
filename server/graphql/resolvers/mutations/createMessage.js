import pubSub from '../../pubSub';
import db from '../../../db';
import { last } from 'lodash';

const createMessage = (obj, { text, userId, chatroomId }, context) => {
  const newId = last(db.messages).id + 1;
  const newMessage = {
    id: newId,
    createdAt: Date.now(),
    text,
    userId,
    chatroomId,
  };

  db.messages.push(newMessage);

  pubSub.publish('messageCreated', { messageCreated: newMessage });

  return newMessage;
};

export default createMessage;