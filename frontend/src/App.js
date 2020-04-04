import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/login";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./Components/signup";
import Forgetpass from "./Components/forgetpass";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "./Components/Home";
import Mybin from "./Components/mybin";

function App() {
    return (
        <div className="App">
            <Router>
                <Route path="/home" exact component={Home} />
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Signup} />
                <Route path="/forgotpassword" exact component={Forgetpass} />
                <Route path="/mybin" exact component={Mybin} />
                {/*<Route path="/pin" exact component={PinNotes} />*/}
                {/* <Route path="/pinnotes" exact component={Pin} /> */}

            </Router>
        </div>
    );
}

export default App;
