import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './Home'
import EmployeeLogin from './Employee/login'
import Dashboard from './Employee/dashboard'
import ProtectedRouter from './ProtectedRoutes'
import Unauthorized from './401';
import EmployeeRegistration from './Employee/registration';



class Routing extends React.Component{

    constructor(props){
        super(props);
        this.state={isAuth:false}
    }

    render(){
        return(
                    <Switch>
                        <Route exact path='/' component={App}></Route>
                        <Route path='/home' component={App}></Route>
                        <Route path='/login' component={EmployeeLogin}></Route>
                        <Route path='/employee/registration' component={EmployeeRegistration}></Route>
                        <ProtectedRouter path="/dashboard" component={Dashboard}></ProtectedRouter>
                        <Route path="/error/unauthorized" component={Unauthorized}></Route>
                    </Switch>
        )
    }
}

export default Routing