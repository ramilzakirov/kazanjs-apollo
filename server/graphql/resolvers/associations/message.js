import db from '../../../db';

const MessageAssociations = {
	user(message) {
		return db.users.find(x => x.id === message.userId);
	}
}

export default MessageAssociations;
