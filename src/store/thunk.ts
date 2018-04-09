import { ThunkAction as BaseThunkAction } from "redux-thunk";
import { RootState } from "./root-state";

export type ThunkAction<R = void, S = RootState, E = void> = BaseThunkAction<R, S, E>