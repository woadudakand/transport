import actions from './actions';

const {
  ARTICLE_ADD_BEGIN,
  ARTICLE_SEARCH,
  ARTICLE_ADD_SUCCESS,
  ARTICLE_ADD_ERR,
  GET_ARTICLE_BEGIN,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERR,
} = actions;

const initState = {
  articles: [],
  loading: false,
  error: null,
};

const ArticlesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ARTICLE_SEARCH:
      return {
        ...state,
        articles: data.result,
      };

    case ARTICLE_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ARTICLE_ADD_SUCCESS:
      return {
        ...state,
        articles: data.result,
        loading: false,
      };
    case ARTICLE_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: data.result,
        loading: false,
      };
    case GET_ARTICLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default ArticlesReducer;
