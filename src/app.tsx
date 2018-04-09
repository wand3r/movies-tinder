import React from "react"
import { Provider } from "react-redux"
import { MoviesViewerContainer } from "./movies-viewer/components/movies-viewer"
import { createStore } from "./store/create-store"
import "./app.scss"

const store = createStore();

export const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <MoviesViewerContainer />
    </div>
  </Provider>
)
