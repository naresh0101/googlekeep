import React, { Component } from "react";
import Makenote from "./makenote";
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from "react-router-dom";
import PrimarySearchAppBar from "./navbar";
import Notecard from "./notecard";
import AlertDialog from "./searchcard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PinNotes from "./pin";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            search: false
        };
    }

    componentDidMount() {
        var token = reactLocalStorage.get("Token");
        if (token === undefined) {
            this.setState({
                login: true
            });
        }
    }

    render() {
        if (this.state.login) {
            return <Redirect to="/login" />;
        }
        const greeting = "Welcome to React";

        return (
            <div>
                <PrimarySearchAppBar />
                <Makenote />
                <PinNotes />

                <Notecard />
                <div>
                    <Dialog
                        open={this.state.search}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Use Google's location service?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This
                                means sending anonymous location data to Google,
                                even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => this.handleClose()}
                                color="primary"
                            >
                                Disagree
                            </Button>
                            <Button
                                onClick={() => this.handleClose()}
                                color="primary"
                                autoFocus
                            >
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}
