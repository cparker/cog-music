import React from 'react'
import { connect } from 'react-redux'
import Album from './Album'
import { NavLink } from 'react-router-dom'

AlbumList.defaultProps = {
    albumList:[]
}

function AlbumList({albumList}) {

    return (
        <div>
            <div>Total Albums: {albumList.length}</div>
            <span>TITLE</span>
            <span>ARTIST</span>
            <span>GENRE</span>
            <span>YEAR</span>
            <div>
                {albumList.map( al => (
                    <NavLink key={al.id}to={`/album/${al.id}`}><Album {...al}/></NavLink>
                ))}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        storeAlbums:state.albums,
        ...state
    }
}

export default connect(mapStateToProps)(AlbumList)