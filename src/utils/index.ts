import { AnyAction } from "@reduxjs/toolkit";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "../app/store.types";

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith("/pending");
export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith("/rejected");
export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => action.type.endsWith("/fulfilled");
