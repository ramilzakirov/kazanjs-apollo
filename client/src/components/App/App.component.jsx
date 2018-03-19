import React from 'react';
import Grid from 'material-ui/Grid';
import ChatList from '../ChatList/ChatList.component';
import ChatMessages from '../ChatMessages/ChatMessages.component';
import ChatTextArea from '../ChatTextArea/ChatTextArea.component';
import { withStyles } from 'material-ui/styles';
import { compose, withState } from 'recompose';

const App = ({
  classes,
  selectedChatroomId,
  setSelectedChatroomId,
}) => (
  <Grid container={true} spacing={0}>
    <Grid item={true} xs={12} sm={4} className={classes['chat-list-container']}>
      <ChatList
        selectedChatRoomId={selectedChatroomId}
        onSelectChatRoom={room => setSelectedChatroomId(room.id)}
      />
    </Grid>
    <Grid item={true} xs={12} sm={8}>
      {
        selectedChatroomId &&
          <div>
            <ChatMessages chatRoomId={selectedChatroomId} />
            <ChatTextArea chatRoomId={selectedChatroomId} />
          </div>
      }
    </Grid>
  </Grid>
);

const styles = (theme) => ({
  'chat-list-container': {
    borderRight: '1px solid gray',
  },
});

export default compose(
  withStyles(styles),
  withState('selectedChatroomId', 'setSelectedChatroomId', null),
)(App);
