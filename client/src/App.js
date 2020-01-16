import React from 'react';
import Home from './components/Home';
import MyNavbar from './components/MyNavbar';
import Search from './components/Search';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Sales from './components/Sales';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class App extends React.Component {


  render() {


    return (

      <div>
        <BrowserRouter>
        <MyNavbar />
          <Switch>
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/sales" render={() => <Sales />} />
            <Route path="/search/:searchParam" render={(props) => <Search  {...props} />} />
            <Route render={() => <h1>ERROR:404</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}




