import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  )
}
