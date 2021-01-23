
export var isAuth ="false";

export function login(){
    var token=localStorage.getItem("token");
    if (token){
        isAuth=true;
    }
}

export function logout(){
    var token=localStorage.getItem("token");
    if(!token){
        isAuth=false;
    }
}