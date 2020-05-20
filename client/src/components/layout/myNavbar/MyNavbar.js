import React, { useContext } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Dropdown,
  Badge,
  DropdownButton,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { StateContext } from "../../../Contexts/StateContext";
import "./MyNavbar.css";


const MyNavbar = (props) => {

  const { userInfo, logout } = useContext(StateContext);
  let searchParams = "";

  const redirectToSearch = (e) => {
    e.preventDefault();

    let encodedParam = encodeURIComponent(searchParams);
    const { history } = props;
    history.push("/search/" + encodedParam);

    //clear form input fileds
    document.querySelector(".MyNavbar-form").reset();
  };
  return (
    <div>
      <div className="MyNavbar">
        <Navbar
          bg="dark"
          variant="dark"
          expand={false}
          className="MyNavbar-topnav"
        >
          <Navbar.Brand className="MyNavbar-title" as={Link} to="/">
            The Book Shelf
          </Navbar.Brand>
          <Form inline>
            <Navbar.Text>
              <DropdownButton id="dropdown-basic-button" title="My Shelf">
                <Dropdown.Header>
                  <strong>{`Welcome ${userInfo.userName}`}</strong>
                </Dropdown.Header>
                <Dropdown.Divider />
                {userInfo._id ? (
                  <div>
                    <Dropdown.Item as={Link} to="/cart">
                      <span className="mr-3">Shopping Cart</span>
                      <Badge pill variant="danger">
                        {userInfo.myCart.length}
                      </Badge>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/purchaseHistory">
                      Purchase History
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/about">
                      About
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/" onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </div>
                ) : (
                    <div>
                      <Dropdown.Item as={Link} to="/login">
                        Login
                    </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/about">
                        About
                    </Dropdown.Item>
                    </div>
                  )}
              </DropdownButton>
            </Navbar.Text>
          </Form>
        </Navbar>
        <Navbar className="MyNavbar-search-navbar">
          <Form className="MyNavbar-form" onSubmit={(e) => redirectToSearch(e)}>
            <FormControl
              onChange={(e) => (searchParams = e.target.value)}
              type="text"
              placeholder="Search for books by title / author"
              className="MyNavbar-search-input"
              required
              maxLength="40"
            />
            <button className="fas fa-search btn"></button>
          </Form>
        </Navbar>
      </div>
    </div>
  );
};
export default withRouter(MyNavbar);