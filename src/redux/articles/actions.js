const actions = {
  GET_ARTICLE_BEGIN: 'GET_ARTICLE_BEGIN',
  GET_ARTICLE_SUCCESS: 'GET_ARTICLE_SUCCESS',
  GET_ARTICLE_ERR: 'GET_ARTICLE_ERR',

  ARTICLE_ADD_BEGIN: 'ARTICLE_ADD_BEGIN',
  ARTICLE_ADD_SUCCESS: 'ARTICLE_ADD_SUCCESS',
  ARTICLE_ADD_ERR: 'ARTICLE_ADD_ERR',

  ARTICLE_SEARCH: 'ARTICLE_SEARCH',

  articleSearch: data => {
    return {
      type: actions.ARTICLE_SEARCH,
      data,
    };
  },

  articleAddBegin: () => {
    return {
      type: actions.ARTICLE_ADD_BEGIN,
    };
  },

  articleAddSuccess: data => {
    return {
      type: actions.ARTICLE_ADD_SUCCESS,
      data,
    };
  },

  articleAddErr: err => {
    return {
      type: actions.ARTICLE_ADD_ERR,
      err,
    };
  },

  getArticleBegin: () => {
    return {
      type: actions.GET_ARTICLE_BEGIN,
    };
  },

  getArticleSuccess: data => {
    return {
      type: actions.GET_ARTICLE_SUCCESS,
      data,
    };
  },

  getArticleErr: err => {
    return {
      type: actions.GET_ARTICLE_ERR,
      err,
    };
  },
};

export default actions;
