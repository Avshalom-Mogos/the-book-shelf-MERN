import React, { createContext, useState, useEffect } from "react";


export const StateContext = createContext();
export const StateContextProvider = (props) => {

  const [userInfo, setUserInfo] = useState({ userName: "" });
  const [readMoreProp, setReadMoreProp] = useState({});
  const [books, setBooks] = useState([]);

  const login = () => {
    const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    setUserInfo(user);
  };

  const logout = () => {
    sessionStorage.removeItem("theBookShelf_user_login");
    setUserInfo({ userName: "Guest" });
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    if (user) {
      login();
    } else {
      setUserInfo({ userName: "Guest" });
    }
  }, []);


  return (
    <StateContext.Provider value={{
      books,
      setBooks,
      userInfo,
      setUserInfo,
      readMoreProp,
      setReadMoreProp,
      login,
      logout
    }}>
      {props.children}
    </StateContext.Provider>
  )
};