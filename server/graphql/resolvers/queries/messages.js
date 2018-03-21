import db from '../../../db';

const messages = (parent, { chatroomId }, context) => {
  return chatroomId
    ? db.messages.find(x => x.chatroomId === chatroomId)
    : db.messages;
};

export default messages;