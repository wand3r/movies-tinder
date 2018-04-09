import { createStore as baseCreateStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { moviesReducer } from "../movies-viewer/store";
import { RootState } from "./root-state";

const rootReducer = combineReducers<RootState>({
  movies: moviesReducer
})

export const createStore = () => baseCreateStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)