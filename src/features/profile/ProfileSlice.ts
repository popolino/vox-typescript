import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPost, TProfile, TRegistrationFields, TUser } from "./Profile.types";
import { RootState } from "../../app/store";
import avatar from "../../img/avatar.jpg";
import cat from "../../img/image 6.png";
import me from "../../img/pp.jpg";
import { authAPI, profileAPI, usersAPI } from "../../api/api";

export interface ProfileState {
  currentId: number | null;
  authUser: TProfile | null;
  image: File | null;
  status: string;
  input: string;
  edit: boolean;
  postText: string;
  wallData: TPost[];
  button: boolean;
  profile: TProfile | null;
  metaStatus: "pending" | "fulfilled" | "rejected";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
  currentId: null,
  authUser: null,
  image: null,
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
  metaStatus: "fulfilled",
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
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    savePhoto: (state, action) => {
      state.profile && (state.profile.photos = action.payload);
    },
    addImagePost: (state, action) => {
      state.image = action.payload;
    },
    addPost: (
      state,
      action: PayloadAction<{
        online: string;
        postComment: string;
      }>
    ) => {
      state.wallData.unshift({
        id: state.wallData.length + 1,
        username: "Polina As Fuck",
        avatar: avatar,
        online: action.payload.online,
        postComment: action.payload.postComment,
        postPic: state.image,
        likes: 2,
        comments: 0,
        reposts: 3,
      });
    },
  },
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // ADD_PHOTO
    builder.addCase(fetchUpdatePhoto.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchUpdatePhoto.fulfilled, (state, { payload }) => {
      if (state.profile) state.profile.photos = payload.data.photos;
      state.meta.fetching = false;
    });
    builder.addCase(fetchUpdatePhoto.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
  },
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
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchUpdatePhoto = createAsyncThunk<
  { data: { photos: { small: string; large: string } } },
  File,
  { rejectValue: string }
>(
  "profileReducer/fetchUpdatePhoto",
  async (photoFile, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await profileAPI.savePhoto(photoFile);
      dispatch(profileSlice.actions.savePhoto(response.data.photos));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: profileActions, reducer: profileReducer } =
  profileSlice;
