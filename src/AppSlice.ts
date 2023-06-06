import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import avatar from "../../img/avatar.jpg";
import me from "../../img/avatar.jpg";
import cat from "../../img/pp.jpg";
import {authSlice} from "./features/Auth/AuthSlice";

export interface ProfileState {
initialized: boolean
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

const initialState: ProfileState = {
initialized:false,
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
      state.initialized = action.payload
    }
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

export const initializeAppThunk = () => (dispatch:any) => {
  let promise = dispatch(authSlice.actions.setIsAuth(true));
  Promise.all([promise]).then(() => {
    dispatch(appSlice.actions.setInitialized(true));
  });
};



//
// export const fetchUpdateStatus = createAsyncThunk<
//   string,
//   string,
//   { rejectValue: string }
//   >(
//   "profileReducer/fetchUpdateStatus",
//   async (status, { rejectWithValue, dispatch }) => {
//     try {
//       const response: any = await profileAPI.updateStatus(status);
//       console.log(response.data);
//       return response.data;
//     } catch (e: any) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
export const { actions: appActions, reducer: appReducer } =
  appSlice;
