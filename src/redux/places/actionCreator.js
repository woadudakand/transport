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
  placesSearch,
  placesAddBegin,
  placesAddSuccess,
  placesAddErr,
  getPlacesBegin,
  getPlacesSuccess,
  getPlacesErr,
} = actions;

const placeAddDispatch = place => {
  return async dispatch => {
    try {
      dispatch(placesAddBegin());
      const res = await DataService.post('/places', place);
      if (res.data.status === 200) {
        await dispatch(
          placesAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          placesAddErr({
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
        placesAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getPlacesDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getPlacesBegin());
      const res = await DataService.get(`/places`);

      if (res.data.status === 200) {
        await dispatch(
          getPlacesSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getPlacesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getPlacesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deletePlace = id => {
  return async dispatch => {
    try {
      dispatch(getPlacesBegin());
      const res = await DataService.delete(`/places?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getPlacesSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getPlacesErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getPlacesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getPlaceDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/places/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          placesSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getPlacesErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getPlacesErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updatePlace = place => {
  return async dispatch => {
    try {
      dispatch(placesAddBegin());
      const res = await DataService.put('/places', place);
      if (res.data.status === 200) {
        await dispatch(
          placesAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          placesAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        placesAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getPlaceDispatch, placeAddDispatch, getPlacesDispatch, deletePlace, updatePlace };
