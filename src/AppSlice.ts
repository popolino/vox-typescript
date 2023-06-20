import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import avatar from "../../img/avatar.jpg";
import me from "../../img/avatar.jpg";
import cat from "../../img/pp.jpg";
import { authSlice, fetchAuth } from "./features/Auth/AuthSlice";
import { TUser } from "./features/users/Users.types";
import { fetchFriends } from "./features/users/usersSlice";

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
  // extraReducers: (builder) => {
  //   // FETCH
  //   builder.addCase(fetchUserProfile.pending, (state) => {
  //     state.meta.fetching = true;
  //   });
  //   builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
  //     state.profile = payload;
  //     state.meta.fetching = false;
  //   });
  //   builder.addCase(fetchUserProfile.rejected, (state, { payload }) => {
  //     state.meta.fetching = false;
  //   });
  // },
});

export const initializeAppThunk = () => (dispatch: any) => {
  let promise = dispatch(fetchAuth());
  let promise2 = dispatch(fetchFriends());
  Promise.all([promise, promise2]).then(() => {
    dispatch(appSlice.actions.setInitialized(true));
  });
};

export const { actions: appActions, reducer: appReducer } = appSlice;
