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


class PrimarySearchAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openstatus:false
        };
    }

    handleClose(){
        this.setState({openstatus:false})
    }

    searchfornote(){
      axios.post('http://localhost:7000/searchforcard',{Token:reactLocalStorage.get('Token'),search:document.getElementById('searchinput').value})
          .then((data)=>{
              if (data.data.result){
                  let bgcolor = data.data.data[0].color
                  this.setState({ Title:data.data.data[0].title,Note:data.data.data[0].note,openstatus:true })
                  document.getElementById('searchcard').style.background=bgcolor
              }
          }).catch((err)=>{
          console.log(err)
        alert('Opps not found !')
      })
  }


  deletecard(){

        var title = document.getElementById('alert-dialog-title').innerText
        axios.post('http://localhost:7000/deletenote',{Title:title})
            .then((data)=>{
              this.setState({openstatus:false})
              window.location.reload()
            }).catch((err)=>{
            console.log(err)
        })
    }


    logout(){
      reactLocalStorage.clear()
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
                            <div>
                                <InputBase
                                    style={{background:'#ffffff63',color:'white',padding:'3px',borderRadius:'4px',marginRight:'10px'}}
                                  placeholder="Search for card …"
                                    id="searchinput"
                                  inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>

                              <Button style={{background:'#ffffff63',color:'white'}} onClick={()=>this.searchfornote()}>search</Button>
                            </div>

                        <div className=''>
                             <NavLink to="/login">
                              <Button onClick={()=>this.logout()} color="inherit" style={{float:"right",color:'white',fontWeight:'bolder'}}>logout</Button>
                             </NavLink>

                            <NavLink to="/mybin">
                              <Button color="inherit" style={{float:"right",color:'white',fontWeight:'bolder'}}><DeleteIcon /></Button>
                            </NavLink>

                        </div>
                    </Toolbar>
                  </AppBar>
            </div>

            <div>
              <Dialog
                open={this.state.openstatus}
               onClick={()=>this.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                  <div id='searchcard'>
                        <DialogTitle id="alert-dialog-title">{this.state.Title}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                              {this.state.Note}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={()=>this.deletecard()} color="primary" autoFocus>
                            delete
                          </Button>
                           <Button onClick={()=>this.handleClose()} color="primary" autoFocus>
                            ok
                          </Button>
                        </DialogActions>
                  </div>
              </Dialog>
            </div>

            </div>

        );
    }
}

export default PrimarySearchAppBar;
