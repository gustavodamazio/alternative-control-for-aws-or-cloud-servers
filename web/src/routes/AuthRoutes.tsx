import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import ResetPassword from '../pages/Auth/ResetPassword'
import SingIn from '../pages/Auth/SingIn'
import SignUp from '../pages/Auth/SingUp'
import NotFound from '../pages/Error/NotFound'

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SingIn}></Route>
      <Route path="/sing-up" component={SignUp}></Route>
      <Route path="/forgot-pass" component={ForgotPassword}></Route>
      <Route path="/reset-pass" component={ResetPassword}></Route>
      <Route path="*" component={NotFound} />
    </Switch>
    </BrowserRouter>
  )
}

export default AuthRoutes
