import React, { useState } from "react";
import "./App.css";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Navbar from "./component/navbar/navbar";
import Home from "./component/home/home";
import About from "./component/about/about";
import Services from "./component/services/services";
import Contact from "./component/contact/contact";
import Success from "./component/success/success";
import Details from "./component/Admin/details";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user && user._id ? (
          <>
          <Navbar setLoginUser={setLoginUser} />
          <Component {...props} />
          </>
          
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <div className="app ">
      <Router>
        <Switch>
          <Route exact path="/">
            {user  && user._id? (
              <>
                <Navbar setLoginUser={setLoginUser} />
                <Home />
              </>
            ) : (
              <Register setLoginUser={setLoginUser} />
            )}
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute path="/services" component={Services} />
          <PrivateRoute path="/contact" component={Contact} />
          <PrivateRoute path="/success/:id" component={Success} />
          
        </Switch>
      </Router>
    </div>
  );
}



export default App;
