import React from 'react'
import { connect } from 'react-redux'
import { makeGenreTallyAction } from './store'

AlbumsByGenre.defaultProps = {
    genreTally: []
}

function AlbumsByGenre({ genreTally, dispatch }) {
  console.log(genreTally)

  if (genreTally.length <= 0) {
    dispatch(makeGenreTallyAction())
  }

  return (
    <div>
      {genreTally.map(([genre, tally], index) => {
        return (
          <div key={index}>
            <span>{genre}</span> <span>{tally}</span>
          </div>
        )
      })}
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(AlbumsByGenre)
