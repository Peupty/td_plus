export const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};
