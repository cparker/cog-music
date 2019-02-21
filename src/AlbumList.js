import React from 'react'
import { connect } from 'react-redux'
import Album from './Album'
import { NavLink } from 'react-router-dom'
import './AlbumList.css'

AlbumList.defaultProps = {
  albumList: []
}

function AlbumList({ albumList, storeAlbums }) {
  if (albumList.length <= 0) {
    albumList = storeAlbums
  }

  return (
    <div>
      <h2>Total Albums: {albumList.length}</h2>
      <div className='al-header'>
        <span>TITLE</span>
        <span>ARTIST</span>
        <span>GENRE</span>
        <span>YEAR</span>
      </div>
      <div className='al-table'>
        {albumList.map( (al, index) => (
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
