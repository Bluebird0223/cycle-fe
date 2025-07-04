import {
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    // ...other action types
} from "../constants/categoryConstants";

const initialState = {
    loading: false,
    isDeleted: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                isDeleted: false,
                error: null,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true,
                error: null,
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                isDeleted: false,
                error: action.payload,
            };
        // ...other cases
        default:
            return state;
    }
};