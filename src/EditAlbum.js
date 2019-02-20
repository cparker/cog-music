import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeNewAlbumAction, makeEditAlbumAction } from './store'
import { withRouter } from 'react-router-dom'

const EditAlbum = withRouter(
  ({ albums, dispatch, history, selectedAlbumId }) => {
    const selectedAlbumIdInt = selectedAlbumId && parseInt(selectedAlbumId)
    console.log('IN EDIT, selected is', selectedAlbumIdInt)

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

    console.log('initial state', initialState)

    const [state, setState] = useState(initialState)

    function handleFieldChange(fieldName) {
      return event => {
        console.log('value', event.target.value)
        const change = {}
        change[fieldName] = event.target.value
        setState(Object.assign({}, state, change))
      }
    }

    function handleSave(event) {
      console.log('on submit, state is ', state)
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
      <form onSubmit={handleSave.bind(this)}>
        <div>
          <input
            type="text"
            value={state.album}
            onChange={handleFieldChange('album').bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            value={state.artist}
            onChange={handleFieldChange('artist').bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            value={state.genre}
            onChange={handleFieldChange('genre').bind(this)}
          />
        </div>
        <div>
          <input
            type="text"
            value={state.year}
            onChange={handleFieldChange('year').bind(this)}
          />
        </div>
        <input type="submit" value="SAVE" />
      </form>
    )
  }
)

function mapStateToProps(state) {
  return {
    albums: state.albums
  }
}

export default connect(mapStateToProps)(EditAlbum)
