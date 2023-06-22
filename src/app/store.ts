import {
  configureStore,
  ThunkAction,
  Action,
  ActionCreatorsMapObject,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { profileReducer } from "../features/profile/ProfileSlice";
import { usersReducer } from "../features/users/usersSlice";
import { authReducer } from "../features/auth/AuthSlice";
import { appReducer } from "../AppSlice";
import { useAppDispatch } from "./hooks";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { useMemo } from "react";

export const store = configureStore({
  reducer: {
    usersReducer,
    profileReducer,
    authReducer,
    appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

export type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
  ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // @ts-ignore
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
