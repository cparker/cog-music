import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeNewAlbumAction, makeEditAlbumAction } from './store'
import { withRouter } from 'react-router-dom'
import './EditAlbum.css'


const EditAlbum = withRouter(
  ({ albums, dispatch, history, selectedAlbumId, title }) => {
    const selectedAlbumIdInt = selectedAlbumId && parseInt(selectedAlbumId)

    let initialState = {}
    if (selectedAlbumIdInt !== undefined) {
      initialState = albums.find(a => a.id === selectedAlbumIdInt)
    } else {
      initialState = {
        album: 'Enter an album title',
        artist: 'Enter an artist',
        genre: 'Enter a genre',
        year: 'Enter a year'
      }
    }


    const [state, setState] = useState(initialState)

    function handleFieldChange(fieldName) {
      return event => {
        const change = {}
        change[fieldName] = event.target.value
        setState(Object.assign({}, state, change))
      }
    }

    function handleSave(event) {
      if (selectedAlbumIdInt !== undefined) {
        dispatch(makeEditAlbumAction(state, selectedAlbumIdInt))
        history.replace(`/album/${selectedAlbumIdInt}`)
      } else {
        dispatch(makeNewAlbumAction(state))
        history.replace('/albums')
      }

      event.preventDefault()
    }

    return (
      <React.Fragment>
      <h2>{title}</h2>
      <form className='edit-album-form' onSubmit={handleSave.bind(this)}>
        <div className='form-row'>
          <label>Album Name</label>
          <input
            type="text"
            value={state.album}
            onChange={handleFieldChange('album').bind(this)}
          />
        </div>
        <div className='form-row'>
          <label>Artist</label>
          <input
            type="text"
            value={state.artist}
            onChange={handleFieldChange('artist').bind(this)}
          />
        </div>
        <div className='form-row'>
          <label>Genre</label>
          <input
            type="text"
            value={state.genre}
            onChange={handleFieldChange('genre').bind(this)}
          />
        </div>
        <div className='form-row'>
          <label>Year</label>
          <input
            type="text"
            value={state.year}
            onChange={handleFieldChange('year').bind(this)}
          />
        </div>
        <div className='button-row'>
            <input type="submit" value="SAVE" />
        </div>
      </form>
      </React.Fragment>
      
    )
  }
)

EditAlbum.defaultProps = {
    title: ''
}

function mapStateToProps(state) {
  return {
    albums: state.albums
  }
}

export default connect(mapStateToProps)(EditAlbum)
