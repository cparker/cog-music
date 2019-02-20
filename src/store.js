import { createStore } from 'redux'
import albums from './albumdata'

const initialState = {
  albums: albums,
  artistAlbums: []
}

export function makeFindArtistAlbums(artistName) {
    return {
        type: 'FIND_ARTIST_ALBUMS',
        artistName
    }
}

export function makeNewAlbumAction(albumDetail) {
  return {
    type: 'NEW_ALBUM',
    albumDetail
  }
}

export function makeDeleteAlbumAction(id) {
  return {
    type: 'DELETE_ALBUM',
    id
  }
}

export function makeEditAlbumAction(albumDetail, id) {
  return {
    type: 'EDIT_ALBUM',
    albumDetail,
    id
  }
}

function baseReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_ALBUM':
      return Object.assign({}, state, {
        albums: state.albums.filter(al => al.id !== action.id)
      })

    case 'NEW_ALBUM':
      const newState = Object.assign({}, { newAlbums: state.albums })
      newState.newAlbums.unshift({
        ...action.albumDetail,
        id: new Date().getTime()
      })
      return Object.assign({}, state, {
        albums: newState.newAlbums
      })

    case 'EDIT_ALBUM':
      return Object.assign({}, state, {
        albums: state.albums.map(al => {
          if (al.id === action.id) {
            return action.albumDetail
          } else {
            return al
          }
        })
      })

    case 'FIND_ARTIST_ALBUMS':
      return Object.assign({}, state, {artistAlbums : state.albums.filter(al => al.artist === action.artistName)})

    default:
      return state
  }
}

export const store = createStore(
  baseReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
