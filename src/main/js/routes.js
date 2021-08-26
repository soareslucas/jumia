import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import User from "./pages/Users";
import Totals from "./pages/Totals";




import App from './app';

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/users" component={User} />
        <Route path="/total" component={Totals} />


      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>




);

export default Routes;