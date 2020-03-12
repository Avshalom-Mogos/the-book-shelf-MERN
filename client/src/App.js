import React from 'react';
import Home from './components/home/Home';
import About from './components/about/About';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from './components/termsAndConditions/TermsAndConditions';
import MyNavbar from './components/layout/myNavbar/MyNavbar';
import Search from './components/search/Search';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Footer from './components/layout/footer/Footer';
import Cart from "./components/cart/Cart";
import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory";
import ReadMore from "./components/readMore/ReadMore"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css"


export default class App extends React.Component {

  state = {
    userInfo: { userName: "Guest" },
    readMoreProp: {},
    search: ''
  };

  render() {


    return (
      <div className="App">
        <BrowserRouter>
          <MyNavbar userInfo={this.state.userInfo} triggerLogout={this.logout} />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/privacyPolicy" render={() => <PrivacyPolicy />} />
            <Route exact path="/termsAndConditions" render={() => <TermsAndConditions />} />
            <Route exact path="/login" render={() => <Login triggerLogin={this.login} />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/readMore" render={() => <ReadMore book={this.state.readMoreProp} search={this.state.search}
              triggerLogin={this.login} />} />
            <Route exact path="/Cart" render={() => <Cart triggerLogin={this.login} />} />
            <Route exact path="/purchaseHistory" render={() => <PurchaseHistory triggerLogin={this.login} />} />
            <Route path="/search/:searchParam" render={(props) => <Search   {...props} user={this.state.userInfo}
              triggerLogin={this.login} moreDetails={this.moreDetails} />} />
            <Route render={() => <h1>ERROR:404 page not pound</h1>} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }



  moreDetails = (book, searchParam) => {

    this.setState({ readMoreProp: book, search: searchParam })
  }


  login = () => {

    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    this.setState({ userInfo: user });
  }

  logout = () => {

    sessionStorage.removeItem("theBookShelf_user_login");
    this.setState({ userInfo: { userName: "Guest" } });
    //redirect to home
    window.location.href = `/`
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






