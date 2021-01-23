import React from 'react'

import logo from '../images/Telstra-logo.png'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {login} from './auth'


class EmployeeLogin extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    changeHandler=(e)=>{
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value})
    }

    submitHandler=(e)=>{
        e.preventDefault();
        const data =JSON.stringify({
            account01:this.state.account01,
            password:this.state.password
        })
        Axios.post('http://localhost:4000/api/login',data,{headers:{"Content-Type" : "application/json"}}
        ).then(res=>{
            const token = res.data.token;
            localStorage.setItem('token', token)
            login();
            this.props.history.push('/dashboard')   
        }).catch(err=>{
            this.setState({errorMsg:err.response.data.message})
        })

    }

    render(){
        return(
            <React.Fragment>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/home'}>
                    <img src={logo} alt="" width="80" height="30" className="d-inline-block align-top"/>
                    </Link>
                    <h2 className='mx-auto' style={{color:"#898989"}}>Roster Management System</h2>
                </div>
            </nav>
            <div className='row pt-5'>
                <form className="col-sm-4 offset-4" onSubmit={this.submitHandler}>
                    <h3>Employee Login</h3>
                    <div className="form-group   pt-4">
                        <label htmlFor="dnumber" className="form-label">Account-01</label>
                        <input type="text" className="form-control" id='dnumber' name="account01" required={true} onChange={this.changeHandler}></input>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id='password' name="password" required={true} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mt-3">Login</button>
                    </div>
                </form>
                
            </div>
            <p className="text-center text-danger">{this.state.errorMsg}</p>
            <div className="text-center">
            <p>Or</p>
            <Link to={"/employee/registration"}><button className='btn btn-outline-danger'>Please Sign Up here</button></Link>
            </div>
          
            </React.Fragment>
        )
    }
}

export default EmployeeLogin