import React from "react";
import { Route, Switch } from "react-router-dom";
import {HomePage} from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Meal} from "./meal"
import {Restaurant} from "./restaurant"

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/meals" component={Meal} />
        <Route path="/restaurants" component={Restaurant} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
