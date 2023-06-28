import { GETLOGINFAIL, GETLOGINREQ, GETLOGINSUCCESS, POSTFAILREGISTER, POSTREQREGISTER, POSTSUCCESSREGISTER } from "./actiontype"


const initstate = {
    token:"",
    loading:false,
    error:false,
    message:"",
    role:"",
    username:"",
     auth:false
     
}
export const reducer =(state=initstate , {type,payload})=> {
     switch(type){
        case POSTREQREGISTER : return {...state , loading:true}
        case POSTSUCCESSREGISTER : return {...state , loading:false, message:payload}
        case POSTFAILREGISTER : return {...state , loading:false , error:true}
        case GETLOGINREQ : return {...state , loading:true}
        case GETLOGINSUCCESS: return {...state , loading:false, auth:true, message:payload.message, role:payload.role, username:payload.username , token:payload.token}
        case GETLOGINFAIL: return {...state , loading:false , error:true}
        case "LOGOUT" : return {...state , loading:false, auth:false, message:"", role:"", username:"" , token:""}
        default: return state
    }
} 