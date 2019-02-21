import React from 'react'
import { connect } from 'react-redux'
import { makeGenreTallyAction } from './store'
import './AlbumsByGenre.css'

AlbumsByGenre.defaultProps = {
    genreTally: []
}

function AlbumsByGenre({ genreTally, dispatch }) {
  console.log(genreTally)

  if (genreTally.length <= 0) {
    dispatch(makeGenreTallyAction())
  }

  return (
    <div className='by-genre-container'>
      <h2>Albums By Genre</h2>
      <div className='by-genre-header'>
        <span>Genre</span>
        <span># Albums</span>
      </div>
      {genreTally.map(([genre, tally], index) => {
        return (
          <div className='by-genre-row' key={index}>
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
