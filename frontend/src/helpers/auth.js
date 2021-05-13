const auth = (url, parameters) => {
  fetch(url, parameters)
    .then(res => res.json())
    .then(user => {
      return {
        ...state,
        token: user.token,
        username: user.username
      };
    });
};
export { auth };
