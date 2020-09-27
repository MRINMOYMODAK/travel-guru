import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import NotFound from './Component/NotFound/NotFound';
import Hotels from './Component/Hotels/Hotels';
import Login from './Component/Login/Login';
import BookingInfo from './Component/BookingInfo/BookingInfo';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';


export const UserLoggedInContext = createContext();

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({
    isLoggedIn: false,
    name: "",
    photoURL: "",
    email : "",
    password: "",
    error : ""
  });
  return (

    <UserLoggedInContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Header></Header>
            <Home></Home>
          </Route>
          <Route path="/info/:bookInfoKey">
            <Header></Header>
            <BookingInfo></BookingInfo>
          </Route>
          <PrivateRoute path="/hotels/:hotelId">
            <Header></Header>
            <Hotels></Hotels>
          </PrivateRoute>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Header></Header>
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserLoggedInContext.Provider>
  );
}

export default App;
