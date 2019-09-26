import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/home/index';
import Product from '../components/product/index';
import Role from '../components/role/index';

export default class Router extends React.Component {
    render() {
        return (
                <Switch>
                    <Route path="/user" component={Home} />
                    <Route path="/productOne" component={Product} />
                    <Route path="/role" component={Role} />
                    <Redirect to="/user" />
                </Switch>
        )
    }
}