import { combineReducers } from "redux";
import user, * as fromUser from './user';

const reducer = combineReducers({
    user,
});

export function isFormDisabled(state) {
    return fromUser.isFormDisabled(state.user);
}

export function isEmailValid(state) {
    return fromUser.isEmailValid(state.user);
}

export default reducer;