import React, { Component } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import {
    Route,
    Link,
    BrowserRouter as Router,
    Redirect,
    NavLink
} from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homepage: false,
        };
    }


    register = (e) => {
        e.preventDefault(); // it prevents page from being refreshed every time user clicks submit
        var Email = document.getElementById("inputEmail").value;
        var Password = document.getElementById("inputPassword").value;
        console.log(Email, Password);
        axios
            .post("http://localhost:7000/registration", {
                email: Email,
                password: Password
            })
            .then(data => {
                if (data.data.result) {
                    reactLocalStorage.set("Token", data.data.Token);
                    this.setState({
                        homepage: true,
                    })
                }else{alert('choose another email')}
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        console.log(this.state.homepage);
        if (this.state.homepage){
            return <Redirect to="/home" />
        }
        return (
            <div style={{ marginTop: "50px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body" style={{width:'100%'}}>
                                    <h5 className="card-title text-center">
                                        Sign Up
                                    </h5>
                                    <form
                                        className="form-signin"
                                        onSubmit={this.register}
                                    >
                                        <div className="form-label-group">
                                            <input
                                                type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                placeholder="Email address"
                                                required
                                                autofocus
                                            />
                                            <label for="inputEmail">
                                                Email address
                                            </label>
                                        </div>

                                        <div className="form-label-group">
                                            <input
                                                type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                            />
                                            <label for="inputPassword">
                                                Password
                                            </label>
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <NavLink to="/login">
                                                {" "}
                                                Login{" "}
                                            </NavLink>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase">
                                            Sign UP
                                        </button>
                                        <hr className="my-4"></hr>
                                        <button
                                            style={{
                                                background: "red",
                                                color: "white"
                                            }}
                                            className="btn btn-lg btn-google btn-block text-uppercase"
                                            type="submit"
                                        >
                                            <i className="fab fa-google mr-2"></i>{" "}
                                            Sign in with Google
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
