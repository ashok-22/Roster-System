import React from 'react'
import Axios from 'axios'
import logo from '../images/Telstra-logo.png'
import {logout} from './auth'
import './dashboard.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={leaves:[]};
    }
    
    logout=()=>{
        localStorage.removeItem('token');
        logout();
        this.props.history.push('/')
    }

    handleApplyLeave=(e)=>{
        e.preventDefault();
        let name=e.target.name;
        let value=e.target.value;
        this.setState({[name]:value})
    }

    applyLeave=(e)=>{
        e.preventDefault();
        let fdate = this.state.fdate;
        let tdate = this.state.tdate;
        let reason = this.state.reason;
        let backup = this.state.backup;
        let data = {"fdate":fdate,"tdate":tdate,"reason":reason,"backup":backup}

        var token = localStorage.getItem('token');
        if(token){
            Axios.post('http://localhost:4000/api/apply-leave',data,{headers:{"Content-Type" : "application/json","authorization" : `Basic ${token}`}}
            ).then(res=>{
                if(res.status==="401"){
                    this.props.history.push('/error/unauthorized')
                }
                if(res.status==="200"){
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                 this.componentDidMount();
                }
                
            }).catch(err=>{
                
                this.setState({"msg":err.response.data.msg.code});
            })
        }
    }

    confirmDeleteModal=(id)=>{
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'Are you sure to cancel this leave?.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.deleteLeave(id)
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          })
    }

    deleteLeave=(id)=>{
        var token=localStorage.getItem('token');
        if(token){
            Axios.delete(`http://localhost:4000/api/delete-leave?id=${id}`,{headers:{"Content-Type" : "application/json","authorization" : `Basic ${token}`}}
            ).then(res=>{
                toast.error(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
            }).catch(err=>{
                
            })
        }
    }


    componentDidMount(){
        var token = localStorage.getItem('token');
        Axios.get('http://localhost:4000/api/dashboard',{
            headers:{
                authorization : `Basic ${token}`
            }
        }).then(res=>{
            console.log(res.data)
               this.setState(res.data)
        }).catch(err=>{
            this.props.history.push('/error/unauthorized')
        })

        Axios.get('http://localhost:4000/api/getleaves',{
            headers:{
                authorization : `Basic ${token}`
            }
        }).then(res=>{
            console.log(res.data)
               this.setState({"leaves":res.data})
        }).catch(err=>{
            this.props.history.push('/error/unauthorized')
        })

    }

    mapLeaves=(leave)=>{
        return(
            <tr key={leave.id}>
                <th scope="row">{leave.id}</th>
                <td>{leave.fromd.slice(0,10)}</td>
                <td>{leave.tod.slice(0,10)}</td>
                <td>{leave.backup}</td>
                <td>{leave.staus?"Approved":"Pending"}</td>
                <td><button onClick={()=>this.confirmDeleteModal(leave.id)}>Cancel</button></td>
            </tr>
        )
    }
    render(){
        return(
            <div>
                <ToastContainer></ToastContainer>
                <header className="border-bottom">
                    <nav className="nav-links">
                        <img alt="logo" className="logo" src={logo} style={{"width":"100px","height":"50px"}}></img>
                        <p className="title">Roster Management System</p>
                        <ul>
                            <li>{this.state.Name}</li>
                            <li><button className="LOGOUT" onClick={this.logout}>Logout</button></li>
                        </ul>
                    </nav>
                </header>
                <div className="row">
                    <div className="col-md-4 offset-1 m-4">
                        <h4>Apply for Leave</h4>
                        <form className="border p-3" onSubmit={this.applyLeave}>
                            <div className="form-group row mt-3">
                                <label className="col-form-label col-sm-2" htmlFor="fromdate">From:</label>
                                <div className="col-sm-6">
                                <input type="date" className="form-control" id="fromdate" name="fdate" onChange={this.handleApplyLeave} required    ></input>
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-form-label col-sm-2" htmlFor="todate">To:</label>
                                <div className="col-sm-6">
                                <input type="date" className="form-control" id="todate" name="tdate" onChange={this.handleApplyLeave} required></input>
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <label className="col-form-label col-sm-2" htmlFor="reason">Reason</label>
                                <div className="col-sm-6">
                                <textarea className="form-control" id="reason" name="reason" onChange={this.handleApplyLeave} required></textarea>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-2">Backup:</div>
                                <div className="col-sm-6">
                                    <select className="form-select" aria-label="Default select example" name="backup" onChange={this.handleApplyLeave} required>
                                    <option defaultValue>----</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                    </select>   
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-4">
                                    <button className="btn btn-primary" type="submit">Apply Leave</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6 mt-4">
                        <h4 className="ml-4">Leaves Requests</h4>
                        <table className="leaves">
                            <tr className="theader">
                            <th scope="col">Id</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Backup</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        {this.state.leaves.length>0?
                            this.state.leaves.map(leave=>{return this.mapLeaves(leave)}):null
                        }
                        </table>
                    </div>
                </div>
                <div className="info">
                <div className="infochild-1">Leaves Applied:</div>
                <div className="infochild-2">Approved:
                </div>
                <div className="infochild-3">Pending:</div>
            </div>
                <footer className="mt-5">
                    <p>Copyright 1999-2020 by Telstra. All Rights Reserved.</p>
                </footer>      
            </div>
            
        )
    }
}

export default Dashboard