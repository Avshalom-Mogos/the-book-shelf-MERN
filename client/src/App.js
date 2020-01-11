import React from 'react';
import Home from './components/Home';
import MyNavbar from './components/MyNavbar';
import Search from './components/Search';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";

export default class App extends React.Component {


  render() {


    return (

      <div>
        <MyNavbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/" render={() => <Home />} />
            <Route path="/search/:searchParam" render={(props) => <Search  {...props} />} />
            <Route render={() => <h1>ERROR:404</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}




