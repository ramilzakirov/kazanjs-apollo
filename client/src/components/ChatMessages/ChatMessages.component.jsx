import React from 'react';
import { compose, pure, mapProps, withState, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui/styles';
import Message from './Message.component';

const ChatMessages = ({
  messages = [],
  classes,
}) => (
  <div className={classes['messages']}>
    { messages.map(message =>
        <div key={message.id} className={classes['message']}>
          <Message message={message} />
        </div>
      )
    }
  </div>
);

const styles = (theme) => ({
  'messages': {
    padding: 20,
  },
  'message': {
    marginBottom: 20,
  }
});

const chatRoomQuery = gql`
  query ($chatRoomId: Int!) {
    chatroom(id: $chatRoomId) {
      messages {
        id
        text
        user {
          id
          fullName
        }
      }
    }
  }
`;

const messageCreatedSubscription = gql`
  subscription ($chatRoomId: Int!){
    messageCreated(chatroomId: $chatRoomId){
      id
      text
    }
  }
`;

export default compose(
  withStyles(styles),
  graphql(chatRoomQuery, {
    name: 'chatRoomQuery',
    options: ({ chatRoomId }) => {
      return {
        variables: {
          chatRoomId,
        },
      };
    },
  }),
  mapProps(({ chatRoomQuery, chatRoomId, ...rest }) => {
    const messages = chatRoomQuery && chatRoomQuery.chatroom && chatRoomQuery.chatroom.messages;

    return {
      ...rest,
      messages,
      subscribeToMessages: () => {
        return chatRoomQuery.subscribeToMore({
          document: messageCreatedSubscription,
          variables: {
            chatRoomId,
          },
          updateQuery: (
            previousResult,
            { subscriptionData }
          ) => {
            if (!subscriptionData.data) {
              return previousResult;
            }

            const newMessage = subscriptionData.data.messageCreated;

            return Object.assign({}, previousResult, {
              chatroom: {
                messages: {
                  $push: [newMessage],
                },
              },
            });
          },
          onError: (err) => console.error(err),
        });
      },
    };
  }),
  withState('subscription', 'setSubscription', null),
  lifecycle({
    componentWillMount() {
      const { subscribeToMessages, setSubscription } = this.props;
      const subscription = subscribeToMessages();
      setSubscription(subscription);
    },
    componentWillUnmount() {
      const { subscription, setSubscription } = this.props;
      subscription.unsubscribe();
      setSubscription(null);
    }
  }),
  pure,
)(ChatMessages);
