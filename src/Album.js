import React from 'react'

export default function Album(album) {

    return (
        <div>
            <span>{album.album}</span>
            <span>{album.artist}</span>
            <span>{album.genre}</span>
            <span>{album.year}</span>
        </div>
    )

}