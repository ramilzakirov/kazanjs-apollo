import { withFilter } from 'graphql-subscriptions';
import pubSub from '../../pubSub';

const messageCreated = {
  subscribe: withFilter(
    () => pubSub.asyncIterator('messageCreated'),
    (payload, { chatroomId }) => {
      return payload.messageCreated.chatroomId === chatroomId;
    }
  ),
};

export default messageCreated;