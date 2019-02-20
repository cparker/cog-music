import React, { Component } from 'react'
import './App.css'
import Article from './Article'
import { Switch, Route, NavLink } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h1>Welcome</h1></header>
        <main>
          <nav>
            <ul>
              <li><NavLink to='/article/1'>Action One</NavLink></li>
              <li><NavLink to='/article/2'>Action Two</NavLink></li>
              <li><NavLink to='/article/3'>Action Three</NavLink></li>
            </ul>
          </nav>
          <article>
            <Switch>
              <Route path = '/article/1' render={() => <Article title='One'/>}/>
              <Route path = '/article/2' render={() => <Article title='Two'/>}/>
              <Route path = '/article/3' render={() => <Article title='Three'/>}/>
            </Switch>
          </article>
        </main>
        <footer>about us</footer>
      </div>
    )
  }
}

export default App
