import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import avatar from "../../img/avatar.jpg";
import me from "../../img/avatar.jpg";
import cat from "../../img/pp.jpg";
import { authAPI, profileAPI, usersAPI } from "../../api/api";
import { usersSlice } from "../users/usersSlice";
import { TAuth, TLogin } from "./Auth.types";
import actions from "redux-form/lib/actions";
import { profileSlice } from "../profile/ProfileSlice";

export interface ProfileState {
  isAuth: boolean;
  authData: TAuth | null;
  metaStatus: "pending" | "fulfilled" | "rejected";

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
  metaStatus: "fulfilled",
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
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchAuth.pending, (state) => {
      state.meta.fetching = true;
      state.metaStatus = "pending";
    });
    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.authData = payload;
      state.meta.fetching = false;
      state.metaStatus = "fulfilled";
    });
    builder.addCase(fetchAuth.rejected, (state, { payload }) => {
      state.meta.fetching = false;
      state.metaStatus = "rejected";
    });
  },
});

export const fetchAuth = createAsyncThunk(
  "authReducer/fetchAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.getAuth();
      dispatch(authSlice.actions.setAuthData(response.data));
      dispatch(authSlice.actions.setIsAuth(true));
      // const authUser: any =
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "authReducer/fetchLogin",
  async (
    {
      email,
      password,
      rememberMe,
    }: { email: string; password: string; rememberMe: boolean },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await authAPI.login(email, password, rememberMe);
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
    dispatch(authSlice.actions.setIsAuth(false));

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
