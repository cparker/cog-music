import React, { Component } from 'react'
import './App.css'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AlbumList from './AlbumList'
import AlbumDetail from './AlbumDetail'
import EditAlbum from './EditAlbum'
import Artist from './Artist'
import AlbumsByGenre from './AlbumsByGenre'
import AlbumsByYear from './AlbumsByYear'
import { makeGenreTallyAction, makeYearTallyAction } from './store'


class App extends Component {
  constructor({dispatch, albums}, state) {
    super()
    this.dispatch = dispatch
    this.albums = albums
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Cog Music</h1>
        </header>
        <main>
          <nav>
            <ul>
              <li>
                <NavLink to="/albums" activeClassName='nav-active'>Albums</NavLink>
              </li>
              <li>
                <NavLink to="/newalbum" activeClassName='nav-active'>Create Album</NavLink>
              </li>
              <li>
                <NavLink onClick={() => this.dispatch(makeGenreTallyAction())} to="/bygenre" activeClassName='nav-active'>Albums by Genre</NavLink>
              </li>
              <li>
                <NavLink onClick={() => this.dispatch(makeYearTallyAction())} to="/byyear" activeClassName='nav-active'>Albums by Year</NavLink>
              </li>
            </ul>
          </nav>
          <article>
            <Switch>
              <Route path="/albums" render={() => {
                return <AlbumList />
              }} />
              <Route
                path="/album/:albumid"
                render={({ match }) => (
                  <AlbumDetail selectedAlbumId={match.params.albumid} />
                )}
              />
              <Route
                path="/newalbum"
                render={() => <EditAlbum key="new" title='New Album' />}
              />
              <Route
                path="/editalbum/:albumid"
                render={({ match }) => (
                  <EditAlbum
                    key="edit"
                    selectedAlbumId={match.params.albumid}
                    title='Edit Album'
                  />
                )}
              />

              <Route
                path="/artist/:artistname"
                render={({ match }) => {
                  return <Artist selectedArtistName={match.params.artistname} />
                }}
              />

              <Route 
                path='/bygenre'
                render={() => <AlbumsByGenre />}
              />

              <Route 
                path='/byyear'
                render={() => <AlbumsByYear />}
              />

            </Switch>
          </article>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    albums: state.albums,
    ...state
  }
}

export default connect(mapStateToProps)(App)
