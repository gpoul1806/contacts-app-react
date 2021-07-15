import { createActions, handleActions } from "redux-actions";

const defaultState = { info: {}, contacts: [], contact: {}, valid: true };

export const { addData, fetchUsers, fetchUser, setValid } = createActions({
  ADD_DATA: (data) => ({ data }),
  FETCH_USERS: (data) => ({ data }),
  FETCH_USER: (data) => ({ data }),
  SET_VALID: (bool) => ({ bool }),
});

const reducer = handleActions(
  {
    [addData]: (state, { payload }) => {
      return { ...state, info: payload };
    },
    [fetchUsers]: (state, { payload }) => {
      return { ...state, contacts: payload };
    },
    [fetchUser]: (state, { payload }) => {
      return { ...state, contact: payload };
    },
    [setValid]: (state, { payload }) => {
      return { ...state, valid: payload };
    },
  },
  defaultState
);

export default reducer;
