import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "./Users.types";
import { usersAPI } from "../../api/api";
import { RootState } from "../../app/store";

export interface IFriendsState {
  users: TUser[];
  friends: TUser[];
  totalUsersCount: number;
  currentPage: number;
  status: "idle" | "loading" | "failed";
  message: any;
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}
export const initialState: IFriendsState = {
  users: [],
  friends: [],
  totalUsersCount: 0,
  currentPage: 1,
  status: "idle",
  message: "",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};
export const usersSlice = createSlice({
  name: "usersReducer",
  initialState,
  reducers: {
    setTotalUsersCount: (state, action) => {
      state.totalUsersCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchUsers.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchUsers.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // FOLLOW
    builder.addCase(followToUser.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(followToUser.fulfilled, (state, { payload }) => {
      state.users = state.users.map((user) =>
        user.id === payload ? { ...user, followed: true } : user
      );
      state.meta.fetching = false;
    });
    builder.addCase(followToUser.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // UNFOLLOW
    builder.addCase(unFollowToUser.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(unFollowToUser.fulfilled, (state, { payload }) => {
      state.users = state.users.map((user) =>
        user.id === payload ? { ...user, followed: false } : user
      );
      state.meta.fetching = false;
    });
    builder.addCase(unFollowToUser.rejected, (state, { payload }) => {
      state.meta.fetching = false;
    });
    // MATCHER
    // builder.addMatcher(isPendingAction, (state) => {
    //   state.status = "loading";
    //   state.message = "";
    // });
    // builder.addMatcher(isFulfilledAction, (state) => {
    //   state.status = "idle";
    // });
    // builder.addMatcher(isRejectedAction, (state, { payload }) => {
    //   state.status = "failed";
    //   state.message = payload;
    // });
  },
});

export const fetchUsers = createAsyncThunk<
  TUser[],
  { currentPage: number; pageCount: number },
  { rejectValue: string }
>(
  "usersReducer/fetchUsers",
  async ({ currentPage, pageCount }, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await usersAPI.getUsers(currentPage, pageCount);
      dispatch(usersSlice.actions.setTotalUsersCount(response.data.totalCount));
      return response.data.items;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const followToUser = createAsyncThunk(
  "usersReducer/followToUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await usersAPI.postFollowUser(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const unFollowToUser = createAsyncThunk(
  "usersReducer/unFollowToUser",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await usersAPI.deleteFollowUser(id);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchFriends = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>("usersReducer/fetchFriends", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response: any = await usersAPI.getFriends();
    dispatch(usersSlice.actions.setFriends(response.data.items));
    return response.data.items;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const { actions: usersActions, reducer: usersReducer } = usersSlice;
