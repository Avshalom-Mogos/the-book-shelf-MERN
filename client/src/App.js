import React from 'react';
import Home from './components/Home';
import MyNavbar from './components/MyNavbar';
import Search from './components/Search';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Sales from './components/Sales';
import Footer from './components/Footer';
import Cart from "./components/Cart";
import Settings from "./components/Settings";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css"

export default class App extends React.Component {

  state = { userInfo: { userName: "Guest" } };

  render() {

    return (
      <div className="App">
        <BrowserRouter>
          <MyNavbar userInfo={this.state.userInfo} triggerLogout={this.logout} />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/login" render={() => <Login triggerLogin={this.login} />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/sales" render={() => <Sales />} />
            <Route exact path="/Cart" render={() => <Cart />} />
            <Route exact path="/Settings" render={() => <Settings />} />
            <Route path="/search/:searchParam" render={(props) => <Search user={this.state.userInfo} triggerLogin={this.login} {...props} />} />
            <Route render={() => <h1>ERROR:404</h1>} />
          </Switch>
          <Footer  />
        </BrowserRouter>
      </div>
    );
  }


  
  login = () => {

    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    this.setState({ userInfo: user });
  }

  logout = () => {

    sessionStorage.removeItem("theBookShelf_user_login");
    this.setState({ userInfo: { userName: "Guest" } });
  }

  componentDidMount() {
    console.log("mount");

    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));

    if (user) {
      this.login()
    } else {
      this.setState({ userInfo: { userName: "Guest" } })
    }
  }
}






