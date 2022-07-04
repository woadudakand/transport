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
  supplierSearch,
  supplierAddBegin,
  supplierAddSuccess,
  supplierAddErr,
  getSupplierBegin,
  getSupplierSuccess,
  getSupplierErr,
} = actions;

const supplierAddDispatch = supplier => {
  return async dispatch => {
    try {
      dispatch(supplierAddBegin());
      const res = await DataService.post('/suplier', supplier);
      if (res.data.status === 200) {
        await dispatch(
          supplierAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          supplierAddErr({
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
        supplierAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getSuppliersDispatch = (currentPage = 1, perPage = 10, callback) => {
  return async dispatch => {
    try {
      dispatch(getSupplierBegin());
      const res = await DataService.get(`/suplier?perPage=${perPage}&&currentPage=${currentPage}`);

      console.log(res.data.data);
      if (res.data.status === 200) {
        await dispatch(
          getSupplierSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );

        callback(res.data.pagination.total);
      } else {
        await dispatch(
          getSupplierErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getSupplierErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteSupplier = id => {
  return async dispatch => {
    try {
      dispatch(getSupplierBegin());
      const res = await DataService.delete(`/suplier?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getSupplierSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getSupplierErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getSupplierErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getSupplierDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/suplier/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          supplierSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getSupplierErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getSupplierErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateSupplier = (supplier, callback) => {
  return async dispatch => {
    try {
      dispatch(supplierAddBegin());
      const res = await DataService.put('/suplier', supplier);

      if (res.data.status === 200) {
        await dispatch(
          supplierAddSuccess({
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
          supplierAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        supplierAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const getSingleSupplierDispatch = id => {
  return async dispatch => {
    try {
      dispatch(getSupplierBegin());
      const res = await DataService.put(`/suplier/single`, { id });

      if (res.data.status === 200) {
        await dispatch(
          getSupplierSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getSupplierErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getSupplierErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export {
  getSuppliersDispatch,
  getSingleSupplierDispatch,
  supplierAddDispatch,
  getSupplierDispatch,
  deleteSupplier,
  updateSupplier,
};
