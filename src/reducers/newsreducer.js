import { ISLOADING, GET_NEWS_LIST } from '../constants/action-types';
const getInitialState = () => ({
    news: [],
    isLoading: false,
});
const newReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading };
        case GET_NEWS_LIST:
            return { ...state, news: action.news };
        default:
            return state;
    }
}
export default newReducer;