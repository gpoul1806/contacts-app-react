import { createActions, handleActions } from "redux-actions";

const defaultState = { info: {}, contacts: [], contact: {} };

export const { addData, fetchUsers, fetchUser } = createActions({
  ADD_DATA: (data) => ({ data }),
  FETCH_USERS: (data) => ({ data }),
  FETCH_USER: (data) => ({ data }),
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
  },
  defaultState
);

export default reducer;
