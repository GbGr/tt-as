import { EMAIL_INPUT, FETCH_USER, REQUEST_USER } from "../actions";

function userReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, ...action.user, fetching: false };
        case REQUEST_USER:
            return { ...state, fetching: true };
        case EMAIL_INPUT:
            return { ...state, draftEmail: action.email };
        default:
            return state;
    }
}

export function isFormDisabled(state) {
    return !state.shared || !isEmailValid(state);
}

export function isEmailValid(state) {
    return !!state.draftEmail && /[^@\s]+@[^@\s]+\.[^@\s]+/.test(state.draftEmail);
}

export default userReducer;