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
  bankAccountListBegin,
  bankAccountListSuccess,
  bankAccountListErr,
  bankAccountSearch,
  bankAccountAddBegin,
  bankAccountAddSuccess,
  bankAccountAddErr,
  getBanksAccountBegin,
  getBanksAccountSuccess,
  getBanksAccountErr,
} = actions;

const bankAccountAdd = (banks, callback) => {
  return async dispatch => {
    try {
      dispatch(bankAccountAddBegin());
      const res = await DataService.post(`bank-accounts?banks_id=${banks.banks_id}`, banks);
      if (res.data.status === 200) {
        await dispatch(
          bankAccountAddSuccess({
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
          bankAccountAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        bankAccountAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getBankAccounts = () => {
  return async dispatch => {
    try {
      dispatch(getBanksAccountBegin());
      const res = await DataService.get(`/bank-accounts`);

      if (res.data.status === 200) {
        await dispatch(
          getBanksAccountSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getBanksAccountErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBanksAccountErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteBankAccount = id => {
  return async dispatch => {
    try {
      dispatch(getBanksAccountBegin());
      const res = await DataService.delete(`/bank-accounts?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getBanksAccountSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getBanksAccountErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getBanksAccountErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getBankAccount = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/bank-accounts/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          bankAccountSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getBanksAccountErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBanksAccountErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateBankAccount = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(bankAccountAddBegin());
      const res = await DataService.put('/bankes', value);
      if (res.data.status === 200) {
        await dispatch(
          bankAccountAddSuccess({
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
          bankAccountAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        bankAccountAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const getBankAccountList = () => {
  return async dispatch => {
    try {
      dispatch(bankAccountListBegin());
      const res = await DataService.get(`/bankes/list`);

      if (res.data.status === 200) {
        await dispatch(
          bankAccountListSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          bankAccountListErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        bankAccountListErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export { getBankAccountList, getBankAccounts, bankAccountAdd, getBankAccount, deleteBankAccount, updateBankAccount };
