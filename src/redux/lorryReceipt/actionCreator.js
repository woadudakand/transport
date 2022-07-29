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
  lorryReceiptSearch,
  lorryReceiptAddBegin,
  lorryReceiptAddSuccess,
  lorryReceiptAddErr,
  getLorryReceiptBegin,
  getLorryReceiptSuccess,
  getLorryReceiptErr,
} = actions;

const lorryReceiptAddDispatch = (lorryReceipt, callback) => {
  return async dispatch => {
    try {
      dispatch(lorryReceiptAddBegin());
      const res = await DataService.post('/lr', lorryReceipt);
      if (res.data.status === 200) {
        await dispatch(
          lorryReceiptAddSuccess({
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
          lorryReceiptAddErr({
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
        lorryReceiptAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getLorryReceiptsDispatch = (currentPage = 1, perPage = 10, callback) => {
  return async dispatch => {
    try {
      dispatch(getLorryReceiptBegin());
      const res = await DataService.get(`/lr?perPage=${perPage}&&currentPage=${currentPage}`);

      console.log(res.data.data);
      if (res.data.status === 200) {
        await dispatch(
          getLorryReceiptSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );

        callback(res.data.pagination.total);
      } else {
        await dispatch(
          getLorryReceiptErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getLorryReceiptErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteLorryReceipt = id => {
  return async dispatch => {
    try {
      dispatch(getLorryReceiptBegin());
      const res = await DataService.delete(`/lr?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getLorryReceiptSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getLorryReceiptErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getLorryReceiptErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getLorryReceiptDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/lr/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          lorryReceiptSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getLorryReceiptErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getLorryReceiptErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateLorryReceipt = (lorry, callback) => {
  return async dispatch => {
    try {
      dispatch(lorryReceiptAddBegin());
      const res = await DataService.put('/lr', lorry);

      if (res.data.status === 200) {
        await dispatch(
          lorryReceiptAddSuccess({
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
          lorryReceiptAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        lorryReceiptAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const getSingleLorryReceiptDispatch = id => {
  return async dispatch => {
    try {
      dispatch(getLorryReceiptBegin());
      const res = await DataService.put(`/lr/single`, { id });

      if (res.data.status === 200) {
        await dispatch(
          getLorryReceiptSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getLorryReceiptErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getLorryReceiptErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export {
  getLorryReceiptsDispatch,
  getSingleLorryReceiptDispatch,
  lorryReceiptAddDispatch,
  getLorryReceiptDispatch,
  deleteLorryReceipt,
  updateLorryReceipt,
};
