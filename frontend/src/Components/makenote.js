import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { TwitterPicker } from 'react-color';
import { reactLocalStorage } from 'reactjs-localstorage';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

class Makenote extends Component {
    constructor(props) {
        super(props);
        this.state = {
        title:"Take a note...",
        background:'white',
        colors:'none',
        Bin:false,
        Pin:false,
            allnotes:[]
         }
    }
    shownotecard(){
        this.setState({title:'Title'})
        document.getElementById('notecard').style.display="block";
    }
    changecolor(){
       this.setState({colors:'block'})
    }
    savecard(){
        var Title = document.getElementById('titlecard').value;
        var note = document.getElementById('writenote').value;
        document.getElementById('notecard').style.display="none"
        // window.location.reload()

        if (Title !="" || note !=""){
            // document.getElementById("card").style.display="block"
            this.setState({mytitle:Title,mynote:note})
            var token = reactLocalStorage.get('Token')

            axios.post("http://localhost:7000/savenote",{title:Title,Note:note,Token:token,color:this.state.background,bin:this.state.Bin,pin:this.state.Pin})
            .then((data)=>{
                // window.location.reload()
                console.log(data)
            }).catch((err)=>{
                console.error(err);
                alert(err)
            })

        }
        var list = this.state.allnotes
        list.push({title:Title,note:note,color:this.state.background})
        this.setState({allnotes:list})
    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex,colors:'none' });
        // document.getElementById('bgcolor').style.backgroundColor=this.state.background;

      };

    deletecard(id){
        var title = document.getElementById(id).innerText
        axios.post('http://localhost:7000/deletenote',{Title:title})
            .then((data)=>{
                document.getElementById(id+'dtlif').style.display="none"
                // console.log(data)
            }).catch((err)=>{
            console.log(err)
        })
    }

   pin(id){
        var title = document.getElementById(id).innerText
        axios.post('http://localhost:7000/pin',{Title:title})
            .then((data)=>{
                window.location.reload()
                // document.getElementById(id+'dtlif').style.display="none"
            }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <Fragment>
            <div className="container" style={{display:"flex",justifyContent:"center",flexDirection:'column'}}>

            <div style={{display:'flex',flexDirection:'column'}} className="typeyournote">
            <div className="card card-signin mt-4" >
                <div className="card-body">
                    <input id="titlecard" className="makenote pb-2" placeholder={this.state.title} style={{width:"80%"}} onClick={ ()=> this.shownotecard() }/>
                    <div id="notecard" style={{display:'none'}}>
                    <TextareaAutosize aria-label="minimum height" id="writenote" className="makenote" rows={3} placeholder="Take a note..."  /><br/>

                    <img width="25px"  onClick={ ()=>this.changecolor() } src="../changecolor.png" style={{float:'left',cursor:'pointer'}} /><button type="button" className="btn " onClick={ ()=> this.savecard() } style={{float:"right",cursor:"pointer"}}>Done</button>
                    </div>

                </div>
            </div>
            <div style={{display:this.state.colors}}>
            <TwitterPicker
                color={ this.state.background }
                onChangeComplete={ this.handleChangeComplete }
            />
            </div>
            </div>





            {/*<div class="container customcard" id="card" style={{display:'none'}}>*/}
            {/*<div class="row">*/}
                 {this.state.allnotes.reverse().map((data,index)=>{
                    return <div key ={index} class="col-12 col-sm-8 col-md-6 col-lg-4" id={index+'dtlif'}>
                        <div class="card mt-2 mb-2" style={{background:data.color}}>
                        <div className="buy d-flex justify-content-between align-items-center" >
                             <h4 class="card-title p-2" id={index}>{data.title}</h4>
                             <div className="deleteopt"></div>
                        </div>

                                <div class="card-body" style={{width:'100%'}}>
                                <p class="card-text" id={index}>{data.note}</p>

                                <div class="buy d-flex flex-row align-items-center" id='btmenu-card'>
                                <div style={{ cursor:'pointer' }} onClick={()=>this.deletecard(index)} title="delete"><img style={{width:'23px',height:'23px'}} src="../../delete.png" /></div>
                                <div style={{ cursor:'pointer' }} onClick={()=>this.pin(index)} title="pin"><img width="25px" src="../../pin.png" /></div>


                                </div>
                                </div>
                            </div>
                        </div>


                })}
            {/*</div>*/}
            {/*</div>*/}

            </div>

            </Fragment>
         );
    }
}

export default Makenote;