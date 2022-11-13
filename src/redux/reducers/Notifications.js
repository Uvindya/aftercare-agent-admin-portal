import { LOAD_NOTIFICATIONS, GET_NOTIFICATION_COUNT, MARKED_AS_READ } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  notifications: [],
  notificationCount: 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case MARKED_AS_READ: {
      return {
        ...state,
        notifications: state.notifications.map(n => {
          if (n.id == action.payload.id) {
            return action.payload;
          } else {
            return n;
          }
        }),
      };
    }
    case GET_NOTIFICATION_COUNT: {
      return {
        ...state,
        notificationCount: action.payload.count,
      };
    }
    default:
      return state;
  }
};
