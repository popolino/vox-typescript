import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import avatar from "../../img/avatar.jpg";
import me from "../../img/avatar.jpg";
import cat from "../../img/pp.jpg";
import { authAPI, profileAPI, usersAPI } from "../../api/api";
import { usersSlice } from "../users/usersSlice";
import { TAuth, TLogin } from "./Auth.types";
import actions from "redux-form/lib/actions";

export interface ProfileState {
  isAuth: boolean;
  authData: TAuth | null;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
  isAuth: false,
  authData: null,
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    // setUserProfile: (state, action) => {
    //   state.profile = action.payload;
    // },
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

export const fetchAuth = createAsyncThunk<TAuth, void, { rejectValue: string }>(
  "authReducer/fetchAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await authAPI.getAuth();
      dispatch(authSlice.actions.setAuthData(response.data));
      dispatch(authSlice.actions.setIsAuth(true));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogin = createAsyncThunk<
  TLogin,
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: string }
>(
  "authReducer/fetchLogin",
  async ({ email, password, rememberMe }, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await authAPI.login(email, password, rememberMe);
      console.log(response.data.resultCode);
      if (response.data.resultCode === 0) {
        dispatch(fetchAuth());
      }
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogout = createAsyncThunk<
  TAuth,
  void,
  { rejectValue: string }
>("authReducer/fetchLogout", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response: any = await authAPI.logout();
    dispatch(authSlice.actions.setAuthData(null));
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
