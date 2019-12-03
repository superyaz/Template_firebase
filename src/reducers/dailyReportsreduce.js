import { ISLOADING, GET_DAILYREPORTS_LIST } from '../constants/action-types';
const getInitialState = () => ({
    dailyReports: [],
    isLoading: false
});

const dailyreportsReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading }
        case GET_DAILYREPORTS_LIST:
            return { ...state, dailyReports: action.dailyReports };
        default:
            return state;
    }
}

export default dailyreportsReducer;