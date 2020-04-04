import React, { Component,Fragment } from 'react';
import  axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import PrimarySearchAppBar from "./navbar";

class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allnotes:[],
            title:'',
            note:'',
            pin:'',
            bin:''
         }
    }

    componentDidMount() {
        axios.post('http://localhost:7000/mypin',{Token:reactLocalStorage.get('Token')})
            .then((data)=>{
              if (!data.data.result){
                    this.setState({allnotes:data.data})
                // console.log(data.data)
                }else{alert("please login agein")}
            }).catch((err)=>{
            console.log(err,'================================')
        })
    }

    unpin(id){
         var title = document.getElementById(id).innerText
        axios.post('http://localhost:7000/unpin',{Title:title})
            .then((data)=>{
                document.getElementById(id+'ii').style.display="none"
                // console.log(data)
            }).catch((err)=>{
            console.log(err)
        })
    }


    render() {
        console.log(this.state.allnotes)
        return(
            <Fragment>
            <div class="container p-4 customcard" >

            <div className="row" >
            {this.state.allnotes.reverse().map((data,index)=>{
                return <div key ={index} class="col-12 col-sm-8 col-md-6 col-lg-4" id={index+'ii'}>
                        <div class="card mt-2 mb-2" style={{background:data.color}}>
                        <div className="buy d-flex justify-content-between align-items-center" >
                             <h4 class="card-title p-2" id={index}>{data.title}</h4>
                             <div className="deleteopt"></div>
                        </div>

                                <div class="card-body" style={{width:'100%'}}>
                                <p class="card-text">{data.note}</p>

                                <div class="buy d-flex flex-row align-items-center" id='btmenu-card'>
                                <div style={{ cursor:'pointer' }} title="restore" onClick={()=>this.restore(index)}><img width="25px" src="../../pined.png" /></div>
                                </div>
                                </div>
                            </div>
                        </div>


                })}
                </div>
                </div>
                </Fragment>
    )
    }
}

export default Pin;
