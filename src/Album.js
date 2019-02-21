import React from 'react'
import './Album.css'

export default function Album({album, index}) {
    console.log('PP', album, index)

    return (
        <div className='album-row'>
            <span>{album.album}</span>
            <span>{album.artist}</span>
            <span>{album.genre}</span>
            <span>{album.year}</span>
        </div>
    )

}