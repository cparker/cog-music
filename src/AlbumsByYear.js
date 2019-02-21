import React from 'react'
import { connect } from 'react-redux'
import { makeYearTallyAction } from './store'

AlbumsByYear.defaultProps = {
  yearTally: []
}

function AlbumsByYear({ yearTally, dispatch }) {
  if (yearTally.length <= 0) {
    dispatch(makeYearTallyAction())
  }

  return (
    <div>
      {yearTally.map(([year, tally], index) => {
        return (
          <div key={index}>
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
