import React, { Component } from 'react'
import './App.css'
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AlbumList from './AlbumList'
import AlbumDetail from './AlbumDetail'
import EditAlbum from './EditAlbum'
import Artist from './Artist'


class App extends Component {
  constructor({dispatch}, state) {
    super()
    this.dispatch = dispatch
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome</h1>
        </header>
        <main>
          <nav>
            <ul>
              <li>
                <NavLink to="/albums">Albums</NavLink>
              </li>
              <li>
                <NavLink to="/newalbum">Create Album</NavLink>
              </li>
            </ul>
          </nav>
          <article>
            <Switch>
              <Route path="/albums" render={() => <AlbumList />} />
              <Route
                path="/album/:albumid"
                render={({ match }) => (
                  <AlbumDetail selectedAlbumId={match.params.albumid} />
                )}
              />
              <Route
                path="/newalbum"
                render={() => <EditAlbum key="new" album="NEW" />}
              />
              <Route
                path="/editalbum/:albumid"
                render={({ match }) => (
                  <EditAlbum
                    key="edit"
                    selectedAlbumId={match.params.albumid}
                  />
                )}
              />

              <Route
                path="/artist/:artistname"
                render={({ match }) => {
                  return <Artist selectedArtistName={match.params.artistname} />
                }}
              />
            </Switch>
          </article>
        </main>
        <footer>about us</footer>
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
