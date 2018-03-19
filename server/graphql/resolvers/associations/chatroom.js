import db from '../../../db';

const ChatroomAssociations = {
	messages(obj) {
		return db.messages.filter(x => x.chatroomId === obj.id);
	}
}

export default ChatroomAssociations;
