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

const HeaderNotifications = () => {
  const classes = useStyles();

  const { notifications, notificationCount } = useSelector(({ notificationReducer }) => notificationReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length === 0) {
      dispatch(getNotificationCount());
      setInterval(() => {
        if (!window.location.pathname.includes('signin')) dispatch(getNotificationCount());
      }, 10000);
    }
  }, [dispatch, notifications, notificationCount]);

  const onOpenPopOver = event => {
    setAnchorEl(event.currentTarget);
    dispatch(getNotifications());
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
