import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { compose, pure, mapProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui/styles';

const ChatList = ({
  classes,
  chatrooms = [],
  selectedChatRoomId,
  onSelectChatRoom,
}) => (
  <List disablePadding={true}>
    {
      chatrooms.map(item =>
        <ListItem
          key={item.id}
          button={true}
          className={selectedChatRoomId === item.id ? classes['selected'] : ''}
          onClick={() => onSelectChatRoom(item)}
        >
          <ListItemText primary={item.title} secondary="last message here" />
        </ListItem>
      )
    }
  </List>
);

const chatListQuery = gql`
  query chatListQuery {
    chatrooms {
      id
      title
    }
  }
`;

const styles = (theme) => ({
  'selected': {
    borderRight: '3px solid gray',
  },
});

export default compose(
  withStyles(styles),
  graphql(chatListQuery),
  mapProps(({ data: { chatrooms }, ...rest }) => ({ ...rest, chatrooms })),
  pure,
)(ChatList);
