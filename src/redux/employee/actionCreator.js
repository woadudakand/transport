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
  employeeSearch,
  employeeAddBegin,
  employeeAddSuccess,
  employeeAddErr,
  getEmployeeBegin,
  getEmployeeSuccess,
  getEmployeeErr,
  getEmployeeListBegin,
  getEmployeeListSuccess,
  getEmployeeListErr,

  getSingleEmployeeBegin,
  getSingleEmployeeSuccess,
  getSingleEmployeeErr,
} = actions;

const employeeAddDispatch = (data, callback) => {
  return async dispatch => {
    try {
      dispatch(employeeAddBegin());
      const res = await DataService.post('/employees', data);
      if (res.data.status === 200) {
        await dispatch(
          employeeAddSuccess({
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
          employeeAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        employeeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getEmployeesDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getEmployeeBegin());
      const res = await DataService.get(`/employees`);

      if (res.data.status === 200) {
        await dispatch(
          getEmployeeSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getEmployeeErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getEmployeeErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const getEmployeeListDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getEmployeeListBegin());
      const res = await DataService.get(`/employee/list`);

      if (res.data.status === 200) {
        await dispatch(
          getEmployeeListSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getEmployeeListErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getEmployeeListErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteEmployee = id => {
  return async dispatch => {
    try {
      dispatch(getEmployeeBegin());
      const res = await DataService.delete(`/employees?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getEmployeeSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getEmployeeErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getEmployeeErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getEmployeeDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/employees/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          employeeSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getEmployeeErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getEmployeeErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateEmployee = value => {
  return async dispatch => {
    try {
      dispatch(employeeAddBegin());
      const res = await DataService.put('/employees', value);
      if (res.data.status === 200) {
        await dispatch(
          employeeAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          employeeAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        employeeAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

const singleEmployee = id => {
  return async dispatch => {
    try {
      dispatch(getSingleEmployeeBegin());
      const res = await DataService.put('/employees/single', { id });
      if (res.data.status === 200) {
        await dispatch(
          getSingleEmployeeSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getSingleEmployeeErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getSingleEmployeeErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

export {
  getEmployeeListDispatch,
  getEmployeesDispatch,
  employeeAddDispatch,
  getEmployeeDispatch,
  deleteEmployee,
  updateEmployee,
  singleEmployee,
};
