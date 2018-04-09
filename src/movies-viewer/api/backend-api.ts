import { Movie, MovieId } from "../model";

const rejectFailureStatus = (res: Response) =>
  res.ok ? Promise.resolve(res) : Promise.reject(Error(res.statusText))

export const getRecommendations = (): Promise<Movie[]> => 
  fetch("/recommendations", { method: "GET" })
    .then(rejectFailureStatus)
    .then(res => res.json())

export const acceptRecommendation = (id: MovieId): Promise<void> =>
  fetch(`/recommendations/${id}/accept`, { method: "PUT" })
    .then(rejectFailureStatus)
    .then(() => undefined)

export const rejectRecommendation = (id: MovieId): Promise<void> =>
  fetch(`/recommendations/${id}/reject`, { method: "PUT" })
    .then(rejectFailureStatus)
    .then(() => undefined)