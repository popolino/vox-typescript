import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./features/users/usersSlice";
import { fetchAuth } from "./features/auth/AuthSlice";
import { isFulfilledAction, isPendingAction, isRejectedAction } from "./utils";

export interface ProfileState {
  initialized: boolean;
  metaStatus: "idle" | "loading" | "failed";
  message: any;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
  initialized: false,
  metaStatus: "idle",
  message: "",
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
  extraReducers: (builder) => {
    // MATCHER
    builder.addMatcher(isPendingAction, (state) => {
      state.metaStatus = "loading";
      state.message = "";
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.metaStatus = "idle";
    });
    builder.addMatcher(isRejectedAction, (state, payload) => {
      state.metaStatus = "failed";
      state.message = payload;
    });
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
