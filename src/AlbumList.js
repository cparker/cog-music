import React from 'react'
import { connect } from 'react-redux'
import Album from './Album'
import { NavLink } from 'react-router-dom'

function AlbumList({albums}) {

    return (
        <div>
            <div>Total Albums: {albums.length}</div>
            <span>TITLE</span>
            <span>ARTIST</span>
            <span>GENRE</span>
            <span>YEAR</span>
            <div>
                {albums.map( al => (
                    <NavLink key={al.id}to={`/album/${al.id}`}><Album {...al}/></NavLink>
                ))}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(AlbumList)