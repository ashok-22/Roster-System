import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/Telstra-logo.png'
import Axios from 'axios';
import {  toast, ToastContainer } from 'react-toastify';
import {login} from './auth'
import 'react-toastify/dist/ReactToastify.css';

class EmployeeRegistration extends React.Component{
    constructor(props){
        super(props)
        this.state={
  
        }
            
        }


    handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value})
        
    }

    handleSubmit=(e)=>{
        e.preventDefault();
      
        let data=JSON.stringify({name:this.state.name,account:this.state.account,team:this.state.team,email:this.state.email,password:this.state.password});
        Axios.post('http://localhost:4000/api/register',data,{headers:{"Content-Type" : "application/json"}})
        .then(res=>{
            const token = res.data.token;
             
        }).catch(err=>{
            toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
          
    }

    render(){
        return(
            <div>
                <ToastContainer></ToastContainer>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/home">
                        <img
                            src={logo}
                            height="40"
                            alt="logo"
                            loading="lazy"
                        />
                        </Link>
                        <h3 className="mx-auto" style={{color:"#898989"}}>Roster Management System</h3>
                    </div>
                </nav>
                <p className="p-3 text-center" style={{"font-size":"30px"}}>Employee Registration</p>
                <form className="col-md-4 offset-4 border " onSubmit={this.handleSubmit} >
                    <div className="form-group m-3">
                        <label htmlFor="fname">Name:</label>
                        <input type="text" className="form-control" id="name" name="name"  placeholder="Full Name" onChange={this.handleChange}/>
                        
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="account">Account-01:</label>
                        <input type="text" className="form-control" id="account" name="account" placeholder="D-number" onChange={this.handleChange}/>
                      
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                        
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="team">Team:</label>
                        <select className="form-control" id="team" name="team" onChange={this.handleChange}>
                        <option defaultValue>---</option>
                        <option>FDC Simplex</option>
                        </select>
              
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="cpassword">Confirm Password:</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword"  placeholder="Confirm Password" onChange={this.handleChange}/>
                      
                    </div>
                    <div className="m-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <footer className="mt-5">
                    <p>Copyright 1999-2020 by Telstra. All Rights Reserved.</p>
                </footer>
            </div>
        )
    }
}

export default EmployeeRegistration;