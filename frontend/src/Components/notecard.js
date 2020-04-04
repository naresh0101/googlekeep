import React, { Component } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import DeleteIcon from "@material-ui/icons/Delete";
// import Icon from '@material-ui/core/Icon';

class Notecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allnotes: [],
            title: "",
            note: "",
            pin: "",
            bin: ""
        };
    }

    componentDidMount() {
        axios
            .post("http://localhost:7000/fetchnotes", {
                Token: reactLocalStorage.get("Token")
            })
            .then(data => {
                if (!data.data.result) {
                    this.setState({ allnotes: data.data });
                    // console.log(data.data)
                } else {
                    alert("lease login agein");
                }
            })
            .catch(err => {
                // console.log(err, "================================");
                alert('Please login first');
            });
    }

    deletecard(id) {
        var title = document.getElementById(id).innerText;
        axios
            .post("http://localhost:7000/deletenote", { Title: title })
            .then(data => {
                document.getElementById(id + "dtlif").style.display = "none";
                // console.log(data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    pincard(id) {
        var title = document.getElementById(id).innerText;
        axios
            .post("http://localhost:7000/pin", { Title: title })
            .then(data => {
                // console.log(data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    pin(id) {
        var title = document.getElementById(id).innerText;
        axios
            .post("http://localhost:7000/pin", { Title: title })
            .then(data => {
                // document.getElementById(id+'dtlif').style.display="none"
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.allnotes.reverse().map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="mt-4 col-12 col-sm-8 col-md-6 col-lg-4"
                                id={index + "dtlif"}
                            >
                                <div
                                    className="card mt-2 mb-2"
                                    style={{ background: data.color }}
                                >
                                    <div className="buy d-flex justify-content-between align-items-center">
                                        <h4
                                            className="card-title p-2"
                                            id={index}
                                        >
                                            {data.title}
                                        </h4>
                                        <div className="deleteopt"></div>
                                    </div>

                                    <div
                                        className="card-body"
                                        style={{ width: "100%" }}
                                    >
                                        <p className="card-text" id={index}>
                                            {data.note}
                                        </p>

                                        <div
                                            className="buy d-flex flex-row align-items-center"
                                            id="btmenu-card"
                                        >
                                            <div
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    this.deletecard(index)
                                                }
                                                title="delete"
                                            >
                                                <DeleteIcon />
                                            </div>
                                            <div
                                                style={{ cursor: "pointer" }}
                                                onClick={() => this.pin(index)}
                                                title="pin"
                                            >
                                                <img
                                                    width="25px"
                                                    src="../../pin.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Notecard;
