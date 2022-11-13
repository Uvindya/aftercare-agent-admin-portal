import React, { useEffect, useState } from 'react';
import { Box, IconButton, makeStyles, Popover, Tooltip, useTheme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../@coremat/CmtList';
import CmtCard from '../../../@coremat/CmtCard';

import NotificationItem from './NotificationItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { getCustomDateTime, getNewDate } from '../../../@jumbo/utils/dateHelper';
import { useDispatch, useSelector } from 'react-redux';

import { getNotificationCount, getNotifications, markAsRead } from '../../../redux/actions/Notifications';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  iconRoot: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &.active': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  scrollbarRoot: {
    height: 300,
    padding: 16,
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 375,
    },
  },
}));

const actions = [
  {
    label: 'More Detail',
  },
  {
    label: 'Close',
  },
];

const headerNotifications = [
  {
    id: 2,
    title: 'Ttitle -1',
    message: 'this is message',
    category: 'MAINTAINANCE',
    user: {
      id: 101,
      name: 'Dinesh Suthar',
      profile_pic: 'https://www.wheeliebinnumber.co.uk/wp-content/uploads/2016/09/B-1.jpg',
    },
    type: 'POSTING',
    metaData: {
      post: {
        type: 'album',
        title: 'This is Beginning',
        owner: {
          id: 545,
          name: 'Martin Guptil',
          profile_pic: 'https://via.placeholder.com/150x150',
        },
      },
    },
    createdAt: getCustomDateTime(-27, 'minutes', 'MMMM DD, YYYY, h:mm:ss a'),
  },
  {
    id: 2,
    title: 'Ttitle -2',
    message: 'this is message',
    category: 'BREAKDOWN',
    user: {
      id: 101,
      name: 'Dinesh Suthar',
      profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3461ub9jFtxyrgJm7Hw7C1qKTAQo0jbcdUA&usqp=CAU',
    },
    type: 'POSTING',
    metaData: {
      post: {
        type: 'album',
        title: 'This is Beginning',
        owner: {
          id: 545,
          name: 'Martin Guptil',
          profile_pic: 'https://via.placeholder.com/150x150',
        },
      },
    },
    createdAt: getCustomDateTime(-27, 'minutes', 'MMMM DD, YYYY, h:mm:ss a'),
  },
];

const HeaderNotifications = () => {
  const classes = useStyles();

  const { notifications, notificationCount } = useSelector(({ notificationReducer }) => notificationReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [counter, setCounter] = useState(5);
  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length === 0) {
      dispatch(getNotificationCount());
      setInterval(() => {
        dispatch(getNotificationCount());
      }, 10000);
    }
  }, [dispatch, notifications, notificationCount]);

  const onOpenPopOver = event => {
    setAnchorEl(event.currentTarget);
    dispatch(getNotifications());
    setCounter(0);
  };

  const onClosePopOver = () => {
    setAnchorEl(null);
  };

  const onRead = i => {
    if (!i.read) {
      dispatch(markAsRead(i.id));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box pr={2}>
      <Tooltip title="Notifications">
        <IconButton
          onClick={onOpenPopOver}
          className={clsx(classes.iconRoot, 'Cmt-appIcon', {
            active: notificationCount > 0,
          })}>
          {!open && (
            <Badge badgeContent={notificationCount} classes={{ badge: classes.counterRoot }}>
              <NotificationsIcon />
            </Badge>
          )}

          {open && (
            <Badge classes={{ badge: classes.counterRoot }}>
              <NotificationsIcon />
            </Badge>
          )}
        </IconButton>
      </Tooltip>

      <Popover
        className={classes.popoverRoot}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClosePopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            title="Notifications"
            actionsPos="top-corner"
            actions={actions}
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
          <CmtCardContent>
            {notifications.length > 0 ? (
              <PerfectScrollbar className={classes.scrollbarRoot}>
                <CmtList
                  data={notifications}
                  renderRow={(item, index) => <NotificationItem key={index} item={item} onRead={onRead} />}
                />
              </PerfectScrollbar>
            ) : (
              <Box p={6}>
                <Typography variant="body2">No notifications found</Typography>
              </Box>
            )}
          </CmtCardContent>
        </CmtCard>
      </Popover>
    </Box>
  );
};

export default HeaderNotifications;
