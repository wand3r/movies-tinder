import React, { SFC } from "react";
import { Movie } from "../model"
import "./movie-card.scss"

type MovieCardProps = { movie: Movie }

export const MovieCard: SFC<MovieCardProps> =
  ({ movie: { summary, title, rating, imageURL }}) => (
    <div className="movie-card">
      <div className="movie-card__header">
        {`${title} (${rating.toFixed(1)}/10)`}
      </div>
      <div
        className="movie-card__image"
        style={{
          backgroundImage: `url("${imageURL}")`
        }}
      >
      </div>
      <p className="movie-card__summary">
        {summary}
      </p>
    </div>
  )

export const MovieCardPlaceHolder: SFC = () => (
  <div className="movie-card-placeholder">
    <p>Sorry, we don't have more movies for you :(</p>
  </div>
)