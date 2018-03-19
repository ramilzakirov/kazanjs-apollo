import db from '../../../db';

const messages = (obj, { chatroomId }, context) => {
  return chatroomId
    ? db.messages.find(x => x.chatroomId === chatroomId)
    : db.messages;
};

export default messages;