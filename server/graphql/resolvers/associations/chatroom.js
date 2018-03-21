import db from '../../../db';

const ChatroomAssociations = {
	messages(chatroom) {
		return db.messages.filter(x => x.chatroomId === chatroom.id);
	}
}

export default ChatroomAssociations;
