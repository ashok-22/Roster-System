import  React  from "react";
import {Route, Redirect} from 'react-router-dom';
import {isAuth} from './Employee/auth'
 

function ProtectedRoute({component:C, ...rest}){
    return(
        <Route render={(props)=>{
            if(isAuth){
                return <C {...props}></C>
            }
            else{
                return <Redirect to={{
                    pathname: "/error/unauthorized",
                    state: { from: props.location }
                  }}></Redirect>
            }
        }}></Route>

    )
}

export default ProtectedRoute;