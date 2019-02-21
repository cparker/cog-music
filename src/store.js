import { createStore } from 'redux'
import albums from './albumdata'

const initialState = {
  albums: albums,
  artistAlbums: []
}

export function makeSortAction(field) {
    return {
        type: 'SORT',
        field
    }
}

export function makeYearTallyAction() {
    return {
        type: 'YEAR_TALLY'
    }
}

export function makeGenreTallyAction() {
  return {
    type: 'GENRE_TALLY'
  }
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
      return Object.assign({}, state, {
        artistAlbums: state.albums.filter(al => al.artist === action.artistName)
      })

    case 'GENRE_TALLY':
      console.log('computing genre tally')
      const genreTally = state.albums.reduce((acc, { genre }) => {
        if (acc[genre] !== undefined) {
          acc[genre] += 1
        } else {
          acc[genre] = 1
        }
        return acc
      }, {})
      const tallySorted = Object.entries(genreTally)
      tallySorted.sort((left, right) => {
        const [, lTally] = left
        const [, rTally] = right
        return rTally - lTally
      })

      return Object.assign({}, state, { genreTally: tallySorted })

    case 'YEAR_TALLY':
      console.log('computing year tally')
      const yearTally = state.albums.reduce((acc, { year }) => {
        if (acc[year] !== undefined) {
          acc[year] += 1
        } else {
          acc[year] = 1
        }
        return acc
      }, {})

      const yearTallySorted = Object.entries(yearTally)
      yearTallySorted.sort((left, right) => {
        const [, lTally] = left
        const [, rTally] = right
        return rTally - lTally
      })

      return Object.assign({}, state, { yearTally: yearTallySorted })

    case 'SORT':
      const newAlbums = Object.assign({}, {albums:state.albums})
      newAlbums.albums.sort( (L, R) => {
          return L[action.field].localeCompare(R[action.field])
      })
      console.log('STR', newAlbums)
      return Object.assign({}, state, {albums:newAlbums.albums})


    default:
      return state
  }
}

export const store = createStore(
  baseReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
