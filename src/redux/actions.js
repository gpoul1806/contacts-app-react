import { createActions, handleActions } from "redux-actions";

const defaultState = { info: {}, contacts: [], contact: {} };
// i have created three sub-states in order to assign: 
// all the contacts fetched from the api ( contacts )
// the one contact fetched from the api (contact)
// and the info in order to push data to it in order to send them via put/post methods to the db


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
