import { buildAction, ActionsUnion, isActionOf } from 'typesafe-actions'
import { keys, fromArray } from "ts-object"
import { ThunkAction } from "../store/thunk"
import { getRecommendations, acceptRecommendation, rejectRecommendation } from "./api";
import { Movie, MovieId, MoviesState, MovieStatus } from "./model";
import { Reducer } from "redux";

export const fetchMovies = buildAction("GET_MOVIES").async<void, { movies: Movie[] }, Error>()
export const acceptMovie = buildAction("ACCEPT_MOVIE").payload<{ id: MovieId }>()
export const rejectMovie = buildAction("REJECT_MOVIE").payload<{ id: MovieId }>()
export const changeMovie = buildAction("CHANGE_MOVIE").payload<{ id: MovieId }>()

export const fetchMoviesThunk = (): ThunkAction => (dispatch, getState) => {
  dispatch(fetchMovies.request());
  getRecommendations()
    .then(movies => dispatch(fetchMovies.success({ movies })))
    .catch(err => dispatch(fetchMovies.failure(err)))
  }

export const acceptMovieThunk = (id: MovieId): ThunkAction => (dispatch, getState) => {
  dispatch(changeMovie({ id })); // optimistic update
  // TODO handle failure case  
  acceptRecommendation(id)
    .then(() => dispatch(acceptMovie({ id })))
}

export const rejectMovieThunk = (id: MovieId): ThunkAction => (dispatch, getState) => {
  dispatch(changeMovie({ id })); // optimistic update
  // TODO handle failure case
  rejectRecommendation(id)
    .then(() => dispatch(rejectMovie({ id })))
}

const defaultState = { 
  byId: {},
  allIds: [],
  isFetching: false,
  currentIndex: undefined
}

export const moviesReducer: Reducer<MoviesState> = (state = defaultState, action) => {
  if (isActionOf(fetchMovies.request)(action)) {
    return {
      ...defaultState,
      isFetching: true,
    }
  } else if (isActionOf(fetchMovies.success)(action)) {
    const byId = fromArray(x => x.id, x => x, action.payload.movies)
    const allIds = keys(byId) 
    return { 
      byId,
      allIds,
      isFetching: false,
      currentIndex: 0,
    }
  } else if (isActionOf(fetchMovies.failure)(action)) {
    return {
      ...defaultState,
      isFetching: false,
    }
  } else if (isActionOf(changeMovie)(action)) {
    const currentIndex = state.allIds.indexOf(action.payload.id)      
    return {
      ...state,
      currentIndex: currentIndex + 1,
    }
  } else if (isActionOf([acceptMovie, rejectMovie])(action)) {
    const id = action.payload.id
    const currentIndex = state.allIds.indexOf(id)
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          ...state.byId[id],
          status:
            isActionOf(acceptMovie)(action) ? MovieStatus.Accepted :
            isActionOf(rejectMovie)(action) ? MovieStatus.Rejected :
            undefined,
        }
      },
    }
  } else {
    return state
  }
}