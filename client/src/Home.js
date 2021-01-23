import React from 'react';
import './index.css';
import logo from './images/Telstra-logo.png'
import { Link } from "react-router-dom";

class Home extends React.Component{
  render(){
    return(
    <div>
        <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/home'}>
                    <img src={logo} alt="" width="80" height="30" className="d-inline-block align-top"/>
                    </Link>
                    <h2 className='mx-auto' style={{color:"#898989"}}>Roster Management System</h2>
                </div>
            </nav>
        <main>
            <div className="login-links">
                <Link className="login" to="/login">
                    <p>Login as Employee</p>
                    </Link>
                
                <div className="login">
                    <p>Login as Team Lead</p>
                </div>
            </div>
        </main>
        <footer>
            <p>Copyright 1999-2020 by Telstra. All Rights Reserved.</p>
        </footer>
    </div>
    )
  }
}

export default Home;