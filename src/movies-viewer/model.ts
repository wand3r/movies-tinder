export type MovieId = Movie['id']

// TODO create seperate type for api calls and create product type with client only properties
export type Movie = {
  id: string
  imageURL: string
  title: string
  summary: string
  rating: number
  status?: MovieStatus
}

export enum MovieStatus {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
} 

export type MoviesState = {
  byId: { [movieId: string]: Movie }
  allIds: MovieId[]
  isFetching: boolean
  currentIndex: number | undefined
}