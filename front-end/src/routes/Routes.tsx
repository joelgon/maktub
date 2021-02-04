import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../components/dashboard'

import Listing from '../pages/listing'
import Register from '../pages/register'
import Update from '../pages/update'

const routes: React.FC = () => {
  return (
    <Dashboard>
      <Switch>
        <Route exact path="/">
          <Listing />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/update">
          <Update />
        </Route>
      </Switch>
    </Dashboard>
  )
}

export default routes
