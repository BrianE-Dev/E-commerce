import React, { createContext, useEffect, useState } from "react";
import { checkAuthStatus, logoutUser, register } from "../services/authService";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const AppContext = createContext();
//AppContext()
const AppProvider = ({ children }) => {
  const {getTotalItem} = useCart();
  const monthlyAllowee = 75000;
  const [cartItems, setCartItems] = React.useState([getTotalItem]);
  let [cartLength, setCartLength] = useState(0);
  let [isLogin, setIsLogin] = useState(false);
  let [user, setUser] = useState(null);
  let [searchWords, setSearchWords] = useState(null);

   const updateCartLength = ()=>{
      setCartItems(getTotalItem)
  }

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartLength(cartItems.length);
  };

  useEffect(() => {
    if (checkAuthStatus) {
      setIsLogin(true);
    }
  }, []);

  //handle register
  const handleRegister = (payload) => {
    register(payload)
      ? () => {
          alert("Registration successful");
          setIsLogin(true);
        }
      : alert("Account already exist, Login");
  };

  //handle login
  const handleLogin = async (payload) => {
    // email & passwords
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        payload
      );
      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("userToken", userData.accessToken);
        // console.log(userData.accessToken);
        setUser(userData);
        setIsLogin(true);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsLogin(false);
  };

  const updateSearch = (words) => {
    searchWords(words);
  };

  return (
    <AppContext.Provider
      value={{
        monthlyAllowee,
        cartItems,
        cartLength,
        addToCart,
        handleRegister,
        isLogin,
        handleLogin,
        handleLogout,
        user,
        updateSearch,
        searchWords,
        updateCartLength
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
