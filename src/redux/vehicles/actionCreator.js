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
  vehicleSearch,
  vehicleAddBegin,
  vehicleAddSuccess,
  vehicleAddErr,
  getVehicleBegin,
  getVehicleSuccess,
  getVehicleErr,
} = actions;

const vehicleAddDispatch = vehicle => {
  return async dispatch => {
    try {
      dispatch(vehicleAddBegin());
      const res = await DataService.post('/vehicle', vehicle);
      // console.log(res);
      if (res.data.status === 200) {
        await dispatch(
          vehicleAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          vehicleAddErr({
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
        vehicleAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getVehiclesDispatch = (currentPage = 1, perPage = 10, callback) => {
  return async dispatch => {
    try {
      dispatch(getVehicleBegin());
      const res = await DataService.get(`/vehicle?perPage=${perPage}&&currentPage=${currentPage}`);

      console.log(res.data);
      if (res.data.status === 200) {
        // console.log(res.data);
        await dispatch(
          getVehicleSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );

        callback(res.data.pagination.total);
      } else {
        await dispatch(
          getVehicleErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVehicleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteVehicle = id => {
  return async dispatch => {
    try {
      dispatch(getVehicleBegin());
      const res = await DataService.delete(`/vehicle?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getVehicleSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getVehicleErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getVehicleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getVehicleDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/vehicle/query?data=${value}`);
      // console.log(res);
      if (res.data.status === 200) {
        await dispatch(
          vehicleSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getVehicleErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVehicleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateVehicle = (vehicle, callback) => {
  return async dispatch => {
    try {
      dispatch(vehicleAddBegin());
      const res = await DataService.put('/vehicle', vehicle);
      if (res.data.status === 200) {
        await dispatch(
          vehicleAddSuccess({
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
          vehicleAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        vehicleAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const getSingleVehicleDispatch = id => {
  return async dispatch => {
    try {
      dispatch(getVehicleBegin());
      const res = await DataService.put(`/vehicle/single`, { id });

      if (res.data.status === 200) {
        await dispatch(
          getVehicleSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getVehicleErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getVehicleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export {
  vehicleAddDispatch,
  getVehiclesDispatch,
  deleteVehicle,
  getVehicleDispatch,
  updateVehicle,
  getSingleVehicleDispatch,
};
