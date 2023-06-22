import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./features/users/usersSlice";
import { fetchAuth } from "./features/auth/AuthSlice";

export interface ProfileState {
  initialized: boolean;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
  initialized: false,
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
});

export const initializeAppThunk = () => (dispatch: any) => {
  let promise = dispatch(fetchAuth());
  let promise2 = dispatch(fetchFriends());
  Promise.all([promise, promise2]).then(() => {
    dispatch(appSlice.actions.setInitialized(true));
  });
};

export const { actions: appActions, reducer: appReducer } = appSlice;
