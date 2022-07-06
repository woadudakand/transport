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
  vehicleTypeSearch,
  vehicleTypeAddBegin,
  vehicleTypeAddSuccess,
  vehicleTypeAddErr,
  getVehicleTypesBegin,
  getVehicleTypesSuccess,
  getVehicleTypesErr,
} = actions;

const vehicleTypeAddDispatch = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(vehicleTypeAddBegin());
      const res = await DataService.post('/vehicle-type', value);
      // console.log(res);
      if (res.data.status === 200) {
        await dispatch(
          vehicleTypeAddSuccess({
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
          vehicleTypeAddErr({
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
        vehicleTypeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getVehicleTypesDispatch = (currentPage = 1, perPage = 10, callback) => {
  return async dispatch => {
    try {
      dispatch(getVehicleTypesBegin());
      const res = await DataService.get(`/vehicle-type?perPage=${perPage}&&currentPage=${currentPage}`);
      console.log(res.data);
      if (res.data.status === 200) {
        // console.log(res.data.description);
        await dispatch(
          getVehicleTypesSuccess({
            result: res.data.data.data,
            message: res.data.data.message,
            type: res.data.type,
          }),
        );

        callback(res.data.pagination.total);
      } else {
        await dispatch(
          getVehicleTypesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVehicleTypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteVehicleType = id => {
  return async dispatch => {
    try {
      dispatch(getVehicleTypesBegin());
      const res = await DataService.delete(`/vehicle-type?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getVehicleTypesSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getVehicleTypesErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getVehicleTypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getVehicleTypeDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/vehicle-type/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          vehicleTypeSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getVehicleTypesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVehicleTypesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateVehicleType = place => {
  return async dispatch => {
    try {
      dispatch(vehicleTypeAddBegin());
      const res = await DataService.put('/vehicle-type', place);
      if (res.data.status === 200) {
        await dispatch(
          vehicleTypeAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          vehicleTypeAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        vehicleTypeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export {
  getVehicleTypeDispatch,
  vehicleTypeAddDispatch,
  getVehicleTypesDispatch,
  deleteVehicleType,
  updateVehicleType,
};
