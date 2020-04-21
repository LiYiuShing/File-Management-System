import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    token: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.userId,
                token: action.payload.token,
                error: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                token: null,
                error: null
            }

        default:
                return state;
    }
}

export default userReducer;