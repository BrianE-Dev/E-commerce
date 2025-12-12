import React, { createContext, useEffect, useState } from "react";
import { checkAuthStatus, logoutUser, register } from "../services/authService";
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
      // email & passwords
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
        handleRegister, isLogin, handleLogin, handleLogout, user
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };


// useEffect(async () => {
//     setLoading(true);
//       try {
//       const response = await axios.get("https://dummyjson.com/products", )
//       .then((res) => res.json())
//       .then((data) => {
//         setRealProduct(data.products);
//         console.log(data.products);
//       });
//       if (response.status === 200) {
//           const data = response.data;
//           setRealProduct(data.products);
//         console.log(data.products);
//       }
      
//     } catch (error) {
      
//     }; if(!realProduct)(
//       setLoading(false)
//     )

//   }, []);