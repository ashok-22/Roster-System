import React from 'react';
import {Link} from 'react-router-dom'
import errorimg from './images/401.webp'

function Unauthorized(){

    return(
        <div className="text-center" style={{"margin-top":"100px"}}>
            <img src={errorimg} alt="401 error" style={{"height":"250px","width":"300px","border-radius":"5px"}}></img>
            <h2>HTTP Error 401:Un authorized access</h2>
            <p>You have attempted to access a page which you are not authorized to. Please go back to <Link to={'/login'}><span className="h4">LOGIN PAGE</span></Link> and login again</p>
        </div>
    )
}
export default Unauthorized