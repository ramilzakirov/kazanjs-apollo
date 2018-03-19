import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose, pure } from 'recompose';
import Avatar from 'material-ui/Avatar';
import FaceIcon from 'material-ui-icons/Face';
import Typography from 'material-ui/Typography';

const Message = ({
  classes,
  message,
}) => (
  <div className={classes['message']}>
    <div className={classes['message-avatar']}>
      <Avatar>
        <FaceIcon />
      </Avatar>
    </div>
    <div className={classes['message-body']}>
      <div className={classes['message-user']}>
        <Typography variant="caption" gutterBottom align="left">
          {message.user.fullName}
        </Typography>
      </div>
      <div className={classes['message-text']}>
        <Typography gutterBottom noWrap>
          {message.text}
        </Typography>
      </div>
    </div>
  </div>
);

const styles = (theme) => ({
  'message': {
    display: 'flex',
  },
  'message-avatar': {
    width: '40px'
  },
  'message-body': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20
  },
  'message-user': {
    fontStyle: 'italic',
  },
  'message-text': {}
});

export default compose(
  withStyles(styles),
  pure
)(Message);