import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, RequestMusic, AdminInterface } from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/requestMusic" component={RequestMusic} />
        <Route path="/admin" component={AdminInterface} />
    </Switch>
);


export default Router;