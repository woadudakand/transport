import { notification } from 'antd';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const { bankSearch, bankAddBegin, bankAddSuccess, bankAddErr, getBanksBegin, getBanksSuccess, getBanksErr } = actions;

const banksAddDispatch = (banks, callback) => {
  return async dispatch => {
    try {
      dispatch(bankAddBegin());
      const res = await DataService.post('/bankes', banks);
      if (res.data.status === 200) {
        await dispatch(
          bankAddSuccess({
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
          bankAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      console.log(err);
      dispatch(
        bankAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getBanksDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getBanksBegin());
      const res = await DataService.get(`/bankes`);

      if (res.data.status === 200) {
        await dispatch(
          getBanksSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getBanksErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        getBanksErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteBank = id => {
  return async dispatch => {
    try {
      dispatch(getBanksBegin());
      const res = await DataService.delete(`/bankes?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getBanksSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getBanksErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getBanksErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getBankDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/bankes/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          bankSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getBanksErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBanksErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateBank = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(bankAddBegin());
      const res = await DataService.put('/bankes', value);
      if (res.data.status === 200) {
        await dispatch(
          bankAddSuccess({
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
          bankAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        bankAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getBanksDispatch, banksAddDispatch, getBankDispatch, deleteBank, updateBank };
