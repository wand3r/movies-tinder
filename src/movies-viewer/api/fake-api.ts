import * as apiCalls from "./backend-api"
import { sampleMovies } from "./sampleData";

const wait = (ms: number) => new Promise<void>((resolve) =>
  setTimeout(() => resolve(), ms))

export const getRecommendations: typeof apiCalls.getRecommendations =
  () => wait(1000)
  .then(() => console.log("[api] getRecommendations"))
  .then(() => sampleMovies)

export const acceptRecommendation: typeof apiCalls.acceptRecommendation =
  (id) => wait(1000)
  .then(() => console.log(`[api] acceptRecommendation ${id}`))

export const rejectRecommendation: typeof apiCalls.rejectRecommendation =
  (id) => wait(1000)
  .then(() => console.log(`[api] rejectRecommendation ${id}`))