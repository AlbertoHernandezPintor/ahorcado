import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginComponent from './pages/Login-Component/login-component';
import GameComponent from './pages/Game-Component/game-component';
import StatsComponent from './pages/Stats-Component/stats-component';
import ErrorComponent from './pages/Error-Component/error-component';

const Routes = () => {
    return(
        <Switch>
            <Route exact path = '/' component= { LoginComponent }/>
            <Route path = '/game' component = { GameComponent }/>
            <Route path = '/stats' component = { StatsComponent }/>
            <Route path = '/error' component = { ErrorComponent }/>
        </Switch>
   );
}

export default Routes;