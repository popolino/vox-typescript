import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPost, TProfile, TRegistrationFields, TUser } from "./Profile.types";
import { RootState } from "../../app/store";
import avatar from "../../img/avatar.jpg";
import me from "../../img/avatar.jpg";
import cat from "../../img/pp.jpg";
import { authAPI, profileAPI, usersAPI } from "../../api/api";
import { usersSlice } from "../users/usersSlice";
import { TAuth } from "../Auth/Auth.types";
import { authSlice } from "../Auth/AuthSlice";

export interface ProfileState {
  currentId: number | null;
  status: string;
  input: string;
  edit: boolean;
  postText: string;
  wallData: TPost[];
  button: boolean;
  profile: TProfile | null;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
  currentId: null,
  status: "",
  input: "",
  edit: false,
  postText: "",
  wallData: [
    {
      id: 1,
      username: "Polina As Fuck",
      avatar: avatar,
      online: "25 minutes ago",
      postComment: "I need to find a job to provide for a man...",
      postPic: me,
      likes: 2,
      comments: 0,
      reposts: 3,
    },
    {
      id: 2,
      username: "Polina As Fuck",
      avatar: avatar,
      online: "25.11.22",
      postComment: "Ivan Pashkin needs to find a job!",
      postPic: cat,
      likes: 2,
      comments: 0,
      reposts: 3,
    },
  ],
  button: false,
  profile: null,
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

export const profileSlice = createSlice({
  name: "profileReducer",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentId = action.payload;
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
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

export const fetchUserProfile = createAsyncThunk<
  TProfile,
  number,
  { rejectValue: string }
>(
  "profileReducer/fetchUserProfile",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await profileAPI.getUserProfile(id);
      dispatch(profileSlice.actions.setUserProfile(response.data));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchStatus = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>("profileReducer/fetchStatus", async (id, { rejectWithValue, dispatch }) => {
  try {
    const response: any = await profileAPI.getStatus(id);
    dispatch(profileSlice.actions.setStatus(response.data));
    console.log(response.data);
    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const fetchUpdateStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "profileReducer/fetchUpdateStatus",
  async (status, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await profileAPI.updateStatus(status);
      console.log(response.data);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: profileActions, reducer: profileReducer } =
  profileSlice;
