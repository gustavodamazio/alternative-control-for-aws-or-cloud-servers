import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../pages/Error/NotFound';
import Dashboard from '../pages/Main/DashBoard';

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
    </BrowserRouter>
  )
}

export default OtherRoutes
