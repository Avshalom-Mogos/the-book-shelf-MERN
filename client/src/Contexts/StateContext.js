import React, { useContext, useState, useEffect } from "react";

export const StateContext = useContext();

export const StateContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState({ userName: "" });
  const [readMoreProp, setReadMoreProp] = useState({});

  const moreDetails = (book) => {
    setReadMoreProp(book);
  };

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
    <StateContext.Provider
      value={{
        userInfo,
        setUserInfo,
        readMoreProp,
        setReadMoreProp,
        moreDetails,
        login,
        logout,
        
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
