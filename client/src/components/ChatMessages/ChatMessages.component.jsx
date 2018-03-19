import React from 'react';
import { compose, pure, withProps, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui/styles';
import update from 'immutability-helper';
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
  query chatRoomQuery($chatRoomId: Int!) {
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
  subscription messageCreatedSubscription($chatRoomId: Int!){
    messageCreated(chatroomId: $chatRoomId){
      id
      text
      user {
        id
        fullName
      }
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
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { chatRoomId } = nextProps;

      if (this.unsubscribe) {
        if (this.props.chatRoomId !== nextProps.chatRoomId) {
          this.unsubscribe();
          this.unsubscribe = null;
        } else {
          return;
        }
      }

      if (nextProps.chatRoomQuery.loading) {
        return;
      }

      this.unsubscribe = nextProps.chatRoomQuery.subscribeToMore({
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

          return update(previousResult, {
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
  }),
  withProps(({ chatRoomQuery, chatRoomId, ...rest }) => {
    const messages = chatRoomQuery && chatRoomQuery.chatroom && chatRoomQuery.chatroom.messages;
    return { messages };
  }),
  pure,
)(ChatMessages);
