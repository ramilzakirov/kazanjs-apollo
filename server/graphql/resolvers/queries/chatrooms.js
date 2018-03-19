import db from '../../../db';

const chatrooms = (obj, { id }, context) => {
	return id
		? db.chatrooms.find(x => x.id === id)
		: db.chatrooms;
};

export default chatrooms;
