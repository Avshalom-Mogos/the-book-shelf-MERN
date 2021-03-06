import React from 'react';
import Home from './components/home/Home';
import About from './components/about/About';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/termsAndConditions/TermsAndConditions';
import Footer from './components/layout/footer/Footer';
import MyNavbar from './components/layout/myNavbar/MyNavbar';
import Search from './components/search/Search';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Cart from "./components/cart/Cart";
import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory";
import ReadMore from "./components/readMore/ReadMore";
import { Route, Switch } from "react-router-dom";
import "./App.css";


export default class App extends React.Component {

  state = {
    userInfo: { userName: '' },
    readMoreProp: {}
  };

  render() {

    return (
      <div className="App">
        <MyNavbar userInfo={this.state.userInfo} triggerLogout={this.logout} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/privacyPolicy" render={() => <PrivacyPolicy />} />
          <Route exact path="/termsAndConditions" render={() => <TermsAndConditions />} />
          <Route exact path="/login" render={() => <Login triggerLogin={this.login} />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/readMore" render={(props) => <ReadMore book={this.state.readMoreProp} search={this.state.search}
            triggerLogin={this.login} {...props} />} />
          <Route exact path="/Cart" render={() => <Cart triggerLogin={this.login} />} />
          <Route exact path="/purchaseHistory" render={() => <PurchaseHistory triggerLogin={this.login} />} />
          <Route path="/search/:searchParam" render={(props) => <Search user={this.state.userInfo} {...props}
            triggerLogin={this.login} moreDetails={this.moreDetails} />} />
          <Route render={() => <h1>ERROR:404 page not pound</h1>} />
        </Switch>
        <Footer />
      </div>
    );
  }


  moreDetails = (book) => {

    this.setState({ readMoreProp: book })
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

    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));

    if (user) {
      this.login()
    } else {
      this.setState({ userInfo: { userName: "Guest" } })
    }
  }
}






