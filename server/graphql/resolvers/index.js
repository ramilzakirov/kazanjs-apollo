import chatrooms from './queries/chatrooms';
import messages from './queries/messages';
import users from './queries/users';

import createMessage from './mutations/createMessage';

import messageCreated from './subscriptions/messageCreated';

import ChatroomAssociations from './associations/chatroom';
import MessageAssociations from './associations/message';

const resolvers = {
	Query: {
		chatrooms,
		chatroom: chatrooms,
		messages,
		users,
		user: users
	},
	Mutation: {
		createMessage,
	},
	Subscription: {
		messageCreated,
	},
	Chatroom: ChatroomAssociations,
	Message: MessageAssociations
};

export default resolvers;
