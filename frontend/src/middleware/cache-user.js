import { FETCH_USER } from "../store/actions";

const USER_CACHE_KEY = 'USER_CACHE';

export function loadUser() {
  try {
    const store = JSON.parse(localStorage.getItem(USER_CACHE_KEY));
    return store ? store : undefined;
  } catch (e) {
    return undefined;
  }
}

const cacheUser = store => next => action => {
  if (action.type === FETCH_USER) {
    try {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify({ user: { id: action.user.id } }));
    } catch (e) {
      console.error(e);
    }
  }
  return next(action);
};

export default cacheUser;