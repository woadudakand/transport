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
  vTypeSearch,
  vTypeAddBegin,
  vTypeAddSuccess,
  vTypeAddErr,
  getVtypesBegin,
  getVtypesSuccess,
  getVtypesErr,
} = actions;

const vTypeAddDispatch = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(vTypeAddBegin());
      const res = await DataService.post('/vehicle-type', value);
      // console.log(res);
      if (res.data.status === 200) {
        await dispatch(
          vTypeAddSuccess({
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
          vTypeAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        console.log(res);
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      console.log(err);
      dispatch(
        vTypeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getVtypesDispatch = (currentPage = 1, perPage = 10, callback) => {
  return async dispatch => {
    try {
      dispatch(getVtypesBegin());
      const res = await DataService.get(`/vehicle-type?perPage=${perPage}&&currentPage=${currentPage}`);
      console.log(res.data);
      if (res.data.status === 200) {
        // console.log(res.data.description);
        await dispatch(
          getVtypesSuccess({
            result: res.data.data.data,
            message: res.data.data.message,
            type: res.data.type,
          }),
        );

        callback(res.data.pagination.total);
      } else {
        await dispatch(
          getVtypesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVtypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteVtype = id => {
  return async dispatch => {
    try {
      dispatch(getVtypesBegin());
      const res = await DataService.delete(`/vehicle-type?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getVtypesSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getVtypesErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getVtypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getVtypeDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/vehicle-type/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          vTypeSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getVtypesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVtypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateVtype = place => {
  return async dispatch => {
    try {
      dispatch(vTypeAddBegin());
      const res = await DataService.put('/vehicle-type', place);
      if (res.data.status === 200) {
        await dispatch(
          vTypeAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          vTypeAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        vTypeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getVtypeDispatch, vTypeAddDispatch, getVtypesDispatch, deleteVtype, updateVtype };
