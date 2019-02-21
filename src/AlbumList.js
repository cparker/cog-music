import React, { useState } from 'react'
import { connect } from 'react-redux'
import Album from './Album'
import { NavLink } from 'react-router-dom'
import './AlbumList.css'

AlbumList.defaultProps = {
  albumList: []
}

function AlbumList({ albumList, storeAlbums, dispatch }) {
  if (albumList.length <= 0) {
    albumList = storeAlbums
  }

  const initialState = albumList

  const [state, setState] = useState(initialState)
  const [sortState, setSortState] = useState({})

  function handleSort(field) {
    albumList.sort((L, R) => {
      return L[field].localeCompare(R[field])
    })
    if (sortState[field]) {
      albumList.reverse()
      setSortState(Object.assign({}, { [field]: false }))
    } else {
      setSortState(Object.assign({}, { [field]: true }))
    }
    setState(Object.assign({}, state, albumList))
  }

  function getSortIndicator(field) {
    if (sortState[field] !== undefined) {
      return sortState[field] ? <span>&darr;</span> : <span>&uarr;</span>
    } else return null
  }

  return (
    <div>
      <h2>Total Albums: {albumList.length}</h2>
      <div className="al-header">
        <span onClick={() => handleSort('album')}>TITLE {getSortIndicator('album')}</span>
        <span onClick={() => handleSort('artist')}>ARTIST {getSortIndicator('artist')}</span>
        <span onClick={() => handleSort('genre')}>GENRE {getSortIndicator('genre')}</span>
        <span onClick={() => handleSort('year')}>YEAR {getSortIndicator('year')}</span>
      </div>
      <div className="al-table">
        {albumList.map((al, index) => (
          <NavLink key={al.id} to={`/album/${al.id}`}>
            <Album album={al} index={index} />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    storeAlbums: state.albums,
    ...state
  }
}

export default connect(mapStateToProps)(AlbumList)
