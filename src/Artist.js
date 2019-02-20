import React from 'react'
import { connect } from 'react-redux'


function Artist({ selectedArtistName, artistAlbums, dispatch }) {
  console.log('AA', artistAlbums)
//   dispatch(makeFindArtistAlbums(selectedArtistName))

  return (
    <div>
      <div>{selectedArtistName}</div>
      {artistAlbums.map(al => (
        <div key={al.id}>{al.album}</div>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    artistAlbums: state.artistAlbums,
    ...state

  }
}

export default connect(mapStateToProps)(Artist)
