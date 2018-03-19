import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose, pure, withState, withHandlers } from 'recompose';
import Button from 'material-ui/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const ChatTextArea = ({
  classes,
  text,
  setText,
  sendMessage,
}) => (
  <div className={classes['chat-textarea']}>
    <textarea
      className={classes['chat-textarea-input']}
      defaultValue={text}
      placeholder="Введите текст сообщения"
      onChange={({ target: { value } }) => setText(value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          sendMessage(text);
        }
      }}
    />
    <Button
      color="primary"
      onClick={() => sendMessage(text)}
    >
      Отправить
    </Button>
  </div>
);

const styles = (theme) => ({
  'chat-textarea': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 20
  },
  'chat-textarea-input': {
    width: '100%',
    border: 0,
    resize: 'none',
  },
});

const createMessageMutation = gql`
  mutation createMessageMutation($text: String!, $userId: Int!, $chatRoomId: Int!) {
    createMessage(text: $text, userId: $userId, chatroomId: $chatRoomId) {
      id
      text
    }
  }
`;

export default compose(
  withStyles(styles),
  withState('text', 'setText', ''),
  graphql(createMessageMutation),
  withHandlers({
    sendMessage: ({ setText, chatRoomId, mutate }) => {
      return text => {
        mutate({
          variables: {
            text,
            chatRoomId,
            userId: 1,
          },
        })
          .then(data => {
            return setText('');
          })
          .catch(e => {
            console.error(e);
          });
      };
    },
  }),
  pure
)(ChatTextArea);
