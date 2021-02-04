import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import Listing from '../pages/listing'
import Register from '../pages/register'
import Update from '../pages/update'

const routes: React.FC = () => {
  return (
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
  )
}

export default routes
