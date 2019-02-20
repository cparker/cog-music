import React from 'react'
import AlbumList from './AlbumList'
import { connect } from 'react-redux'
import { makeFindArtistAlbums } from './store'

function Artist({ selectedArtistName, artistAlbums, dispatch }) {
  console.log('AA', artistAlbums)
  if (artistAlbums.length <= 0) {
    dispatch(makeFindArtistAlbums(selectedArtistName))
  }

  return (
    <div>
      <div>{selectedArtistName}</div>
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
