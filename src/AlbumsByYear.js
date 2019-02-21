import React from 'react'
import { connect } from 'react-redux'
import { makeYearTallyAction } from './store'
import './AlbumsByYear.css'

AlbumsByYear.defaultProps = {
  yearTally: []
}

function AlbumsByYear({ yearTally, dispatch }) {
  if (yearTally.length <= 0) {
    dispatch(makeYearTallyAction())
  }

  return (
    <div className='by-year-container'>
      <h2>Albums By Year</h2>
      <div className='by-year-header'>
        <span>Year</span>
        <span># Albums</span>
      </div>
      {yearTally.map(([year, tally], index) => {
        return (
          <div className='by-year-row' key={index}>
            <span>{year}</span> <span>{tally}</span>
          </div>
        )
      })}
    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(AlbumsByYear)
