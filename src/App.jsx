import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import SectionHeader from "./component/ui/sectionHeader";
import ThemeToggle from "./component/ThemeToggle";
import Product from "./component/product/Product";
import {
  checkAuthStatus,
  logoutUser,
} from "./services/authService";
import NavMenu from "./component/nav/NavMenu";
import Award from "./component/ui/icons/Award";
import { AppContext, AppProvider } from "./context/AppContext";

function App() {
  const {isLogin, handleRegister, handleLogin, handleLogout} = useContext(AppContext)
  // const [isLoggedIn, setIsLoggedIn] = useState();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reg, setReg] = useState(false);

  // useEffect(() => {
  //   setIsLoggedIn(checkAuthStatus());
  // }, []);
  // const payload = {
  //   fname,
  //   email,
  //   password,
  // };

  //handle login
  // const handleLogin = () => {
  //   // email & password
  //   if (loginUser(payload)) {
  //     setIsLoggedIn(true);
  //   } else {
  //     alert("Invalid Email or Password");
  //     console.log("Login Failed");
  //   }
  //   setPassword("");
  // };

  // //handle logout
  // const handleLogout = () => {
  //   logoutUser();
  //   // setIsLoggedIn(false);
  // };

  // //handle register
  // const handleRegister = () => {
  //   register(payload)
  //     ? alert("Registration successful")
  //     : alert("Account already exist, Login");
  // };logoutUser()

  return (
    <>
      <NavMenu />
      <ThemeToggle className>
        {/* <SearchFilter/> */}
        <Award />
        <SectionHeader />
        {/* {isLoggedIn ? <Product /> : null} */}

        {isLogin ? (
          <>
            <button onClick={()=>handleLogout()} className="dark">
              Logout
            </button>
            <p>You're logged in... Welcome back!</p>
            <p>{isLogin.fname}</p>
            <br />
            <Product />
          </>
        ) : (
          <>
            {reg && (
              <>
                {" "}
                <input
                  className="mb-5"
                  type="First Name"
                  placeholder="John"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <br />
              </>
            )}
            <input
              className="mb-5"
              type="email"
              placeholder="Email eg, user@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              className="mb-5"
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!reg ? (
              <button onClick={()=>handleLogin({username: email, password})} className="light">
                Login
              </button>
            ) : (
              <button onClick={()=>handleRegister(payload)} className="light">
                Register
              </button>
            )}
            <p>
              Please {""} <span onClick={() => setReg(false)}>login</span> to
              access product... or{" "}
              <span onClick={() => setReg(true)}>Register</span>
            </p>
          </>
        )}
      </ThemeToggle>
    </>
  );
}

export default App;
