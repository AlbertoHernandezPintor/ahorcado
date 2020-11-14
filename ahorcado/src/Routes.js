import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import LoginComponent from './pages/Login-Component/login-component';
import GameComponent from './pages/Game-Component/game-component';

const Routes = () => {
    return(
        <Switch>
            <Route exact path = '/' component= { LoginComponent }/>
            <Route path = '/game' component = { GameComponent }/>
        </Switch>
   );
}

export default Routes;