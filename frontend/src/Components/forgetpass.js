import React, { Component,Fragment } from 'react';
import {
    Route,
    Link,
    BrowserRouter as Router,
    Redirect,
    NavLink
} from "react-router-dom";
import axios from 'axios'




class Forgetpass extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loginpage:false
         }
    }
    

    sendpass(){
        var Email = document.getElementById('inputEmail').value
        axios
        .post("http://localhost:7000/forgotpass", {
            email: Email
        })
        .then(data => {
            if (data.data.result) {
                // reactLocalStorage.set("Token", data.data.Token);
               
                alert('check you mail please!')
            }else{alert('invalid email')}
        })
        .catch(err => {
            console.error(err);
        });
    }
    render() { 
      
        return (  
            <Fragment>
                 <div style={{marginTop:'50px'}}>
                    <div className="container">
                        <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                            <div className="card-body" style={{width:'100%'}}>
                                <h5 className="card-title text-center">Lock</h5>
                                <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                                    <label for="inputEmail">Your email....</label>
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                            <NavLink to="/register">
                                                {" "}
                                               check your mail{" "}
                                            </NavLink>
                                            <NavLink
                                                to="/login"
                                                style={{
                                                    float: "right",
                                                    paddingRight: "15px"
                                                }}
                                            >
                                                {" "}
                                                Login{" "}
                                            </NavLink>
                                        </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={()=>this.sendpass()}>Send</button>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}
 
export default Forgetpass;