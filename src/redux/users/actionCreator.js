import { notification } from 'antd';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const {
  userSearch,
  registerBegin,
  registerSuccess,
  registerErr,
  getUsersBegin,
  getUsersSuccess,
  getUsersErr,
} = actions;

const registerUser = user => {
  return async dispatch => {
    try {
      dispatch(registerBegin());
      const res = await DataService.post('/signup', user);
      if (res.data.status === 200) {
        await dispatch(
          registerSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          registerErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        registerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getUsersDispatch = branch => {
  return async dispatch => {
    try {
      dispatch(getUsersBegin());
      const res = await DataService.get(`/signup?data='${branch}'`);

      if (res.data.status === 200) {
        await dispatch(
          getUsersSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getUsersErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getUsersErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteUser = id => {
  return async dispatch => {
    try {
      dispatch(registerBegin());
      const res = await DataService.delete(`/signup?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          registerSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          registerErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        registerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const updateUser = user => {
  return async dispatch => {
    try {
      dispatch(registerBegin());
      const res = await DataService.put('/signup', user);
      if (res.data.status === 200) {
        await dispatch(
          registerSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          registerErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        registerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getUserDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/signup/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          userSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getUsersErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getUsersErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export { getUserDispatch, registerUser, getUsersDispatch, deleteUser, updateUser };
