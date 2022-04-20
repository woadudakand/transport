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
  branchSearch,
  branchAddBegin,
  branchAddSuccess,
  branchAddErr,
  getBranchBegin,
  getBranchSuccess,
  getBranchErr,
  getBranchListBegin,
  getBranchListSuccess,
  getBranchListErr,
} = actions;

const branchAddDispatch = (value, callback) => {
  return async dispatch => {
    try {
      dispatch(branchAddBegin());
      const res = await DataService.post('/branch', value);
      if (res.data.status === 200) {
        await dispatch(
          branchAddSuccess({
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
          branchAddErr({
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
        branchAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getBranchesDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getBranchBegin());
      const res = await DataService.get(`/branch`);

      if (res.data.status === 200) {
        await dispatch(
          getBranchSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getBranchErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBranchErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const getBranchListDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getBranchListBegin());
      const res = await DataService.get(`/branch/list`);

      if (res.data.status === 200) {
        await dispatch(
          getBranchListSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getBranchListErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBranchListErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteBranch = id => {
  return async dispatch => {
    try {
      dispatch(getBranchBegin());
      const res = await DataService.delete(`/branch?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getBranchSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getBranchErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getBranchErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getBranchDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/branch/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          branchSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getBranchErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getBranchErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateBranch = place => {
  return async dispatch => {
    try {
      dispatch(branchAddBegin());
      const res = await DataService.put('/branch', place);
      if (res.data.status === 200) {
        await dispatch(
          branchAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          branchAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        branchAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getBranchListDispatch, getBranchesDispatch, branchAddDispatch, getBranchDispatch, deleteBranch, updateBranch };
