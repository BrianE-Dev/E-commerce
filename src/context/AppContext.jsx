import React, { createContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, register } from "../services/authService";
import axios from 'axios'

const AppContext = createContext();
//AppContext()
const AppProvider = ({ children }) => {
  const monthlyAllowee = 75000;
  const [cartItems, setCartItems] = React.useState([]);
  let [cartLength, setCartLength] = useState(0);
  let [isLogin, setIsLogin] = useState(false);
  let [user, setUser] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartLength(cartItems.length + 1);
  };

  useEffect(()=>{
        if(checkAuthStatus){
            setIsLogin(true)
        }
  },[])

  //handle register
  const handleRegister = (payload) => {
    register(payload)
      ? (()=>{alert("Registration successful"); setIsLogin(true)})
      : alert("Account already exist, Login");
  };

   //handle login
    const handleLogin = async(payload) => {
      // email & password
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', payload);
        if(response.status === 200){
            const userData = response.data;
            localStorage.setItem("userToken", userData.accessToken);
            console.log(userData.accessToken);
            setUser(userData);     
            setIsLogin(true);

        }
      } catch (error) {
        
      }
    };

    const handleLogout = ()=>{
        logoutUser();
        setIsLogin(false)
    }

  return (
    <AppContext.Provider
      value={{
        monthlyAllowee,
        cartItems,
        cartLength,
        addToCart,
        handleRegister, isLogin, handleLogin, handleLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
