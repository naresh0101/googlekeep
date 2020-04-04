import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from "@material-ui/core/InputBase";

import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios'
import {NavLink} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';


class Binbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div>

            <div>
                  <AppBar position="static">
                    <Toolbar style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <IconButton edge="start"  color="inherit" aria-label="menu">
                                <NavLink to="/home">
                                <img src="../../logo512.png" style={{width:'90px'}} />
                                </NavLink>
                              </IconButton>

                            </div>

                    </Toolbar>
                  </AppBar>
            </div>

            </div>

        );
    }
}

export default Binbar;
