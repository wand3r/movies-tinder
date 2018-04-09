import React, { Component, ComponentType, SFC } from "react"
import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views"
import { virtualize } from "react-swipeable-views-utils"
import { connect } from "react-redux"
import cn from "classnames"
import { Button, ButtonDirection, ButtonColor } from "../../shared-components/buttons"
import { CheckIcon, RejectIcon } from "../../shared-components/icons"
import { disableBackSwipe } from "../../shared-components/react-swipeable-views-utils"
import { MovieCard, MovieCardPlaceHolder } from "./movie-card";
import { Movie, MovieId } from "../model";
import { RootState } from "../../store/root-state"
import { fetchMoviesThunk, acceptMovieThunk, rejectMovieThunk, fetchMovies } from "../store"
import "./movies-viewer.scss";
import { Loader } from "../../shared-components/loader";

const VirtualizeSwipeableViews = virtualize(disableBackSwipe(SwipeableViews));
  

type MoviesViewerProps = { 
  movies: { [movieId: string]: Movie }
  moviesIds: MovieId[]
  currentMovieIndex: number
  isLoading: boolean
  // return any because react-redux can't handle thunk actions
  acceptMovie: (id: MovieId) => any
  rejectMovie: (id: MovieId) => any
  fetchMovies: () => any
}

type MoviesViewerState = {  }

export class MoviesViewer extends Component<MoviesViewerProps, MoviesViewerState> {
  componentDidMount() {
    this.props.fetchMovies()
  }

  render() {
    
    const {
      movies, currentMovieIndex, moviesIds, isLoading,
      acceptMovie, rejectMovie,
    } = this.props
    const currentMovieId = moviesIds[currentMovieIndex]
    const moviesCount = moviesIds.length

    return (
      <div className="movies-viewer">
        {
          // TODO add separate case when fatching movies ended with failure
          isLoading || moviesCount === 0
            ? <div className="movies-viewer__loader">
                <Loader />
              </div>
            : <>
                <VirtualizeSwipeableViews
                  className="movies-viewer__swiper"
                  index={currentMovieIndex}
                  enableMouseEvents={true}
                  slideCount={moviesCount + 1}
                  style={{ height: "100%" }}
                  slideStyle={{ height: "100%" }}
                  containerStyle={{ height: "100%" }}
                  slideRenderer={({ key, index}) => (
                    index < 0 ? <div /> : 
                    index >= moviesCount ? <MovieCardPlaceHolder key={`placeholder-${key}`} /> :
                    <MovieCard key={moviesIds[index]} movie={movies[moviesIds[index]]} />
                  )}
                  onChangeIndex={(index) => {
                    rejectMovie(currentMovieId)  
                  }}
                />
                <div
                  className={cn(
                    "movies-viewer__footer",
                    { "movies-viewer__footer--hidden": currentMovieIndex >= moviesCount }
                  )}
                >
                  <div className="movies-viewer__button">
                    <AcceptButton onClick={() => acceptMovie(currentMovieId)} />
                  </div>
                  <div className="movies-viewer__button">
                    <RejectButton onClick={() => rejectMovie(currentMovieId)} />
                  </div>
                </div>
              </>
        }
      </div>
    ) 
  }
}

export const MoviesViewerContainer = connect(
  (state: RootState) => ({
    movies: state.movies.byId,
    moviesIds: state.movies.allIds,
    currentMovieIndex: state.movies.currentIndex,
    isLoading: state.movies.isFetching,
  }),
  {
    acceptMovie: acceptMovieThunk,
    rejectMovie: rejectMovieThunk,
    fetchMovies: fetchMoviesThunk,
  }
)(MoviesViewer)

type ButtonProps = {
  onClick: () => void
}

const AcceptButton: SFC<ButtonProps> = ({ onClick }) => (
  <Button
    label="Accept"
    icon={<CheckIcon />}
    direction={ButtonDirection.Left}
    color={ButtonColor.Green}
    onClick={onClick}
  />
)

const RejectButton: SFC<ButtonProps> = ({ onClick }) => (
  <Button
    label="Reject"
    icon={<RejectIcon />}
    direction={ButtonDirection.Right}
    color={ButtonColor.Red}
    onClick={onClick}
  />
)

