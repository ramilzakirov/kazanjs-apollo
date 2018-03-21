import db from '../../../db';

const chatrooms = (parent, { id }, context) => {
	return id
		? db.chatrooms.find(x => x.id === id)
		: db.chatrooms;
};

export default chatrooms;
