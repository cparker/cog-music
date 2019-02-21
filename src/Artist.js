import React from 'react'
import AlbumList from './AlbumList'
import { connect } from 'react-redux'
import { makeFindArtistAlbums } from './store'

function Artist({ selectedArtistName, artistAlbums, dispatch }) {
  if (artistAlbums.length <= 0) {
    dispatch(makeFindArtistAlbums(selectedArtistName))
  }

  return (
    <div>
      <h2>Albums by {selectedArtistName}</h2>
      <AlbumList albumList={artistAlbums}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    artistAlbums: state.artistAlbums
  }
}

export default connect(mapStateToProps)(Artist)
