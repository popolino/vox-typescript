import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "./Users.types";
import { usersAPI } from "../../api/api";

export interface IFriendsState {
  users: TUser[];
  friends: TUser[];
  foundUser: TUser[];
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
  foundUser: [],
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
    setFoundUser: (state, action) => {
      state.foundUser = action.payload;
    },
    cleanFoundUser: (state) => {
      state.foundUser = [];
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
    builder.addCase(fetchUsers.rejected, (state) => {
      state.meta.fetching = false;
    });
    // FETCH
    builder.addCase(fetchFoundUser.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(fetchFoundUser.fulfilled, (state, { payload }) => {
      state.foundUser = payload;
      state.meta.fetching = false;
    });
    builder.addCase(fetchFoundUser.rejected, (state) => {
      state.meta.fetching = false;
    });
    // FOLLOW
    builder.addCase(followToUser.pending, (state) => {
      state.meta.fetching = true;
    });
    builder.addCase(followToUser.fulfilled, (state, { payload }) => {
      const friend: TUser | undefined = state.users.find(
        (user) => user.id === payload
      );
      const findUser: TUser | undefined = state.foundUser.find(
        (findUser) => findUser.id === payload
      );
      if (friend) {
        const i = state.users.indexOf(friend);
        friend.followed = true;
        state.users[i] = friend;
        state.friends.push(friend);
      }

      if (findUser) {
        const j = state.foundUser.indexOf(findUser);
        findUser.followed = true;
        state.foundUser[j] = findUser;
        state.friends.push(findUser);
        state.meta.fetching = false;
      }
    });

    builder.addCase(followToUser.rejected, (state) => {
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
      state.friends = state.friends.filter((friend) => friend.id !== payload);
      state.foundUser = state.foundUser.map((user) =>
        user.id === payload ? { ...user, followed: false } : user
      );
      state.friends = state.friends.filter((friend) => friend.id !== payload);
      state.meta.fetching = false;
    });
    builder.addCase(unFollowToUser.rejected, (state) => {
      state.meta.fetching = false;
    });
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
      await usersAPI.deleteFollowUser(id);
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
export const fetchFoundUser = createAsyncThunk<
  TUser[],
  string,
  { rejectValue: string }
>(
  "usersReducer/fetchFoundUser",
  async (username, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await usersAPI.getFindUser(username);
      dispatch(usersSlice.actions.setFoundUser(response.data.items));
      return response.data.items;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: usersActions, reducer: usersReducer } = usersSlice;
