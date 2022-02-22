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
  articleSearch,
  articleAddBegin,
  articleAddSuccess,
  articleAddErr,
  getArticleBegin,
  getArticleSuccess,
  getArticleErr,
} = actions;

const articlesAddDispatch = place => {
  return async dispatch => {
    try {
      dispatch(articleAddBegin());
      const res = await DataService.post('/articles', place);
      if (res.data.status === 200) {
        await dispatch(
          articleAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          articleAddErr({
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
        articleAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Registered!', err.toString());
    }
  };
};

const getArticlesDispatch = () => {
  return async dispatch => {
    try {
      dispatch(getArticleBegin());
      const res = await DataService.get(`/articles`);

      if (res.data.status === 200) {
        await dispatch(
          getArticleSuccess({
            result: res.data.data,
            message: res.data.message,
            type: res.data.type,
          }),
        );
      } else {
        await dispatch(
          getArticleErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        getArticleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const deleteArticle = id => {
  return async dispatch => {
    try {
      dispatch(getArticleBegin());
      const res = await DataService.delete(`/articles?id=${id}`);
      if (res.data.status === 200) {
        await dispatch(
          getArticleSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          getArticleErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        getArticleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Deleted!', err.toString());
    }
  };
};

const getArticleDispatch = value => {
  return async dispatch => {
    try {
      const res = await DataService.get(`/articles/query?data=${value}`);

      if (res.data.status === 200) {
        await dispatch(
          articleSearch({
            result: res.data.data,
          }),
        );
      } else {
        await dispatch(
          getArticleErr({
            message: res.data.message,
            type: res.data.type,
          }),
        );
      }
    } catch (err) {
      dispatch(
        getArticleErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
    }
  };
};

const updateArticle = place => {
  return async dispatch => {
    try {
      dispatch(articleAddBegin());
      const res = await DataService.put('/articles', place);
      if (res.data.status === 200) {
        await dispatch(
          articleAddSuccess({
            result: res.data.data,
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('success', res.data.message, res.data.description);
      } else {
        await dispatch(
          articleAddErr({
            message: res.data.message,
            description: res.data.description,
            type: res.data.type,
          }),
        );
        openNotificationWithIcon('error', res.data.message, res.data.description);
      }
    } catch (err) {
      dispatch(
        articleAddErr({
          message: 'Record Submit failed! Please check your connection',
          type: 'error',
        }),
      );
      openNotificationWithIcon('error', 'Updated!', err.toString());
    }
  };
};

export { getArticlesDispatch, articlesAddDispatch, getArticleDispatch, deleteArticle, updateArticle };
