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
  driverSearch,
  driverAddBegin,
  driverAddSuccess,
  driverAddErr,
  getDriverBegin,
  getDriverSuccess,
  getDriverErr,
} = actions;

const driverAddDispatch = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(driverAddBegin());
      const res = await DataService.post('/drivers', value);
      if (res.data.status === 200) {
        await dispatch(
          driverAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
        callback();
      } else {
        await dispatch(
          driverAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        driverAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getDriversDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getDriverBegin());
      const res = await DataService.get(`/drivers`);

      if (res.data.status === 200) {
        await dispatch(
          getDriverSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getDriverErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getDriverErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteCustomer = id => {
  return async dispatch => {
    try {
      dispatch(getDriverBegin());
      const res = await DataService.delete(`/drivers?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getDriverSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getDriverErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getDriverErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getDriverDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/drivers/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          driverSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getDriverErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getDriverErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateDriver = value => {
  return async dispatch => {
    try {
      dispatch(driverAddBegin());
      const res = await DataService.put('/drivers', value);
      if (res.data.status === 200) {
        await dispatch(
          driverAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          driverAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        driverAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getDriversDispatch, driverAddDispatch, getDriverDispatch, deleteCustomer, updateDriver };
