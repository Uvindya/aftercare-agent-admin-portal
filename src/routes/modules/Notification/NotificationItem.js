import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CmtMediaObject from '../../../@coremat/CmtMediaObject';
import CmtAvatar from '../../../@coremat/CmtAvatar';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  feedItemRoot: {
    padding: '10px 5px',
    position: 'relative',
    marginBottom: '5px',
    borderBottom: `1px solid #ccc`,
    '& .Cmt-media-object': {
      alignItems: 'center',
    },
    '& .Cmt-media-image': {
      alignSelf: 'flex-start',
      width: 56,
    },
    '& .Cmt-media-body': {
      width: 'calc(100% - 56px)',
      flex: 'inherit',
    },
  },
  titleRoot: {
    letterSpacing: 0.25,
    marginBottom: 6,
    cursor: 'pointer',
  },
  readItem: {
    backgroundColor: '#ccc',
  },
}));

const NotificationItem = ({ item, onRead }) => {
  const classes = useStyles();

  const getTitle = (item, classes) => {
    return (
      <Typography component="div" variant="h5" className={classes.titleRoot}>
        <Box component="span">{item.title}</Box>
      </Typography>
    );
  };

  const getSubTitle = () => (
    <Box display="flex" alignItems="center" fontSize={12} color="text.disabled">
      {<Box ml={1}>{item.message}</Box>}
    </Box>
  );

  const getIcon = category => {
    if (category === 'MAINTAINANCE') {
      return 'https://www.wheeliebinnumber.co.uk/wp-content/uploads/2016/09/M-1.jpg';
    } else if (category === 'BREAKDOWN') {
      return 'https://www.wheeliebinnumber.co.uk/wp-content/uploads/2016/09/B-1.jpg';
    }
    return 'https://www.wheeliebinnumber.co.uk/wp-content/uploads/2016/09/O-1.jpg';
  };
  const onClick = item => {
    onRead(item);
  };
  return (
    <Box
      onClick={() => onClick(item)}
      className={item.read ? `${classes.feedItemRoot}` : `${classes.feedItemRoot} ${classes.readItem}`}>
      <CmtMediaObject
        avatarPos="center"
        onBodyClick={() => onClick(item)}
        avatar={<CmtAvatar size={40} src={getIcon(item.category)} alt={item.category} />}
        title={getTitle(item, classes)}
        subTitle={getSubTitle()}
      />
    </Box>
  );
};

export default NotificationItem;
