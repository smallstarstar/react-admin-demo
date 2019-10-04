import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/home/index';
import BookName from '../components/product/bookName/book-name';
import Role from '../components/role/index';
import Category from '../components/product/category/category';
import BookDec from '../components/product/bookName/book-dec';

export default class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/user" component={Home} />
                <Route path="/productOne" component={BookName} />
                <Route path="/role" component={Role} />
                <Route path="/productTwo" component={Category} />
                <Route path="/produceDec/:id" component={BookDec} />
                <Redirect to="/user" />
            </Switch>
        )
    }
}