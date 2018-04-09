import React from "react"
import { storiesOf } from "@storybook/react"
import * as k from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"
import { MovieCard, MovieCardPlaceHolder } from "./movie-card"
import { sampleMovies } from "../api/sampleData"
import { MoviesViewer } from "./movies-viewer"
import { fromArray } from "ts-object"

storiesOf("movies-viewer", module)
  .addDecorator(story => (
    <div style={{ width: 500, height: 400 }}>
      {story()}
    </div>
  ))
  .add("MovieCard 0", () => (
    <MovieCard movie={sampleMovies[0]}/>
  ))
  .add("MovieCard 1", () => (
    <MovieCard movie={sampleMovies[1]}/>
  ))
  .add("MovieCardPlaceHolder", () => (
    <MovieCardPlaceHolder />
  ))
  .add("MovieViewer", () => (
    <MoviesViewer
      movies={fromArray(x => x.id, x => x, sampleMovies)}
      moviesIds={sampleMovies.map(x => x.id)}
      currentMovieIndex={0}
      isLoading={false}
      acceptMovie={action("acceptMovie")}
      rejectMovie={action("rejectMovie")}
      fetchMovies={action("fetchMovies")}
    />
  ))
  .add("MovieViewer end", () => (
    <MoviesViewer
      movies={fromArray(x => x.id, x => x, sampleMovies)}
      moviesIds={sampleMovies.map(x => x.id)}
      currentMovieIndex={2}
      isLoading={false}
      acceptMovie={action("acceptMovie")}
      rejectMovie={action("rejectMovie")}
      fetchMovies={action("fetchMovies")}
    />
  ))
  .add("MovieViewer loading", () => (
    <MoviesViewer
      movies={fromArray(x => x.id, x => x, sampleMovies)}
      moviesIds={sampleMovies.map(x => x.id)}
      currentMovieIndex={2}
      isLoading={true}
      acceptMovie={action("acceptMovie")}
      rejectMovie={action("rejectMovie")}
      fetchMovies={action("fetchMovies")}
    />
  ))