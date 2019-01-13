import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const EMAIL_INPUT = 'EMAIL_INPUT';

export function fetchUser(userId) {
  return dispatch => {
    dispatch({ type: REQUEST_USER });
    return axios.get(userId ? `/api/user/${ userId }` : '/api/user').then(({ data }) => {
      dispatch({
        type: FETCH_USER,
        user: data,
      });
    });
  };
}

export function shareByURL(url, userId) {
  return new Promise((resolve, reject) => {
    const shareWindow = window.open(url);
    requestAnimationFrame(function checkShareIsCompleted() {
      if (!shareWindow.closed) return requestAnimationFrame(checkShareIsCompleted);
      axios.patch(`/api/user/${ userId }/shared`, null)
        .then(({ data }) => ({
          type: FETCH_USER,
          user: data,
        }))
        .then(resolve, reject);
    });
  });
}

export function emailInput(email) {
  return {
    type: EMAIL_INPUT,
    email,
  };
}

export function saveEmail(email, userId) {
  return axios.patch(`/api/user/${userId}/email`, { email })
    .then(({ data }) => ({
      type: FETCH_USER,
      user: data,
    }));
}