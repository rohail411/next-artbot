import * as actions from '../actionTypes';
const searchReducer = (state = { filtered: [] }, action) => {
    switch (action.type) {
        case actions.SEARCH_RESULT:
            return {
                filtered: [...action.payload]
            };
        default:
            return { ...state };
    }
};

export default searchReducer;
