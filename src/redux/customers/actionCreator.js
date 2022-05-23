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
  customerSearch,
  customerAddBegin,
  customerAddSuccess,
  customerAddErr,
  getCustomerBegin,
  getCustomerSuccess,
  getCustomerErr,
} = actions;

const customerAddDispatch = customer => {
  return async dispatch => {
    try {
      dispatch(customerAddBegin());
      const res = await DataService.post('/customers', customer);
      if (res.data.status === 200) {
        await dispatch(
          customerAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          customerAddErr({
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
        customerAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getCustomersDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getCustomerBegin());
      const res = await DataService.get(`/customers`);

      if (res.data.status === 200) {
        await dispatch(
          getCustomerSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getCustomerErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getCustomerErr({
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
      dispatch(getCustomerBegin());
      const res = await DataService.delete(`/customers?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getCustomerSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getCustomerErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getCustomerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getCustomerDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/customers/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          customerSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getCustomerErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getCustomerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateCustomer = customer => {
  return async dispatch => {
    try {
      dispatch(customerAddBegin());
      const res = await DataService.put('/customers', customer);
      if (res.data.status === 200) {
        await dispatch(
          customerAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          customerAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        customerAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const getSingleCustomerDispatch = id => {
  return async dispatch => {
    try {
      dispatch(getCustomerBegin());
      const res = await DataService.put(`/customers/single`, { id });

      if (res.data.status === 200) {
        await dispatch(
          getCustomerSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getCustomerErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getCustomerErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export {
  getCustomersDispatch,
  getSingleCustomerDispatch,
  customerAddDispatch,
  getCustomerDispatch,
  deleteCustomer,
  updateCustomer,
};
