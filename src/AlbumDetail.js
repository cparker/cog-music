import React from 'react'
import { connect } from 'react-redux'
import { makeDeleteAlbumAction } from './store'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { makeFindArtistAlbums } from './store'
import './AlbumDetail.css'

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
      <div className='alDetail-container'>
        <div className='alDetail-row'><span>ALBUM</span><span>{selectedAlbum.album}</span></div>
        <div className='alDetail-row selectable' onClick={() => {
            handleSelectArtist(selectedAlbum.artist, dispatch)
            history.replace(`/artist/${encodeURIComponent(selectedAlbum.artist)}`)
        }}>
          {/* <NavLink
            onClick={() => handleSelectArtist(selectedAlbum.artist, dispatch)}
            to={`/artist/${encodeURIComponent(selectedAlbum.artist)}`}
          > */}
            <span>ARTIST</span><span>{selectedAlbum.artist}</span>
          {/* </NavLink> */}
        </div>
        <div className='alDetail-row'><span>GENRE</span><span>{selectedAlbum.genre}</span></div>
        <div className='alDetail-row'><span>YEAR</span><span>{selectedAlbum.year}</span></div>

        <div className='alDetail-row'>
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
