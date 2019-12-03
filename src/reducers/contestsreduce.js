import { ISLOADING, GET_CONTEST_LIST } from '../constants/action-types';
const getInitialState = () => ({
    contests: [],
    isLoading: false
});

const contestsReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading }
        case GET_CONTEST_LIST:
            return { ...state, contests: action.contests };
        default:
            return state;
    }
}

export default contestsReducer;