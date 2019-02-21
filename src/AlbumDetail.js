import React from 'react'
import { connect } from 'react-redux'
import { makeDeleteAlbumAction } from './store'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { makeFindArtistAlbums } from './store'

function handleDeleteAlbum(id, dispatch, history) {
  console.log('lets kill', id)
  history.replace('/albums')
  dispatch(makeDeleteAlbumAction(id))
}

function handleSelectArtist(artist, dispatch) {
  console.log('selected artist', artist)
  dispatch(makeFindArtistAlbums(artist))
}

const AlbumDetail = withRouter(
  ({ selectedAlbumId, albums, dispatch, history }) => {
    console.log('AD props', albums)
    const selectedAlbumIdInt = parseInt(selectedAlbumId)
    const selectedAlbum = albums.find(al => al.id === selectedAlbumIdInt)

    const notFound = <div>Sorry, we don't have that album</div>
    const albumDisplay = () => (
      <div>
        <div>ALBUM {selectedAlbum.album}</div>
        <div>
          <NavLink
            onClick={() => handleSelectArtist(selectedAlbum.artist, dispatch)}
            to={`/artist/${encodeURIComponent(selectedAlbum.artist)}`}
          >
            ARTIST {selectedAlbum.artist}
          </NavLink>
        </div>
        <div>GENRE {selectedAlbum.genre}</div>
        <div>YEAR {selectedAlbum.year}</div>

        <button
          onClick={() => {
            history.replace(`/editalbum/${selectedAlbumId}`)
          }}
        >
          EDIT
        </button>
        <button
          onClick={() =>
            handleDeleteAlbum(selectedAlbumIdInt, dispatch, history)
          }
        >
          DELETE
        </button>
      </div>
    )

    return selectedAlbum ? albumDisplay() : notFound
  }
)

function mapStateToProps(state) {
  return {
    albums: state.albums
  }
}

export default connect(mapStateToProps)(AlbumDetail)
