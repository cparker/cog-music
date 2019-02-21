import { createStore } from 'redux'

const initialState = {
  albums: [],
  artistAlbums: []
}

export function makeLoadAction() {
  return {
    type: 'LOAD'
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD':
      return fetch('/albums')
        .then(res => res.json())
        .then(albumJson => {
          return Object.assign({}, { albums: albumJson })
        })

    default:
      return state
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
