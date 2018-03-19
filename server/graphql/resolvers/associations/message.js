import db from '../../../db';

const MessageAssociations = {
	user(obj) {
		return db.users.find(x => x.id === obj.userId);
	}
}

export default MessageAssociations;
