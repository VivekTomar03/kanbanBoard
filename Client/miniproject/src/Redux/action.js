import axios from "axios"
import { GETLOGINFAIL, GETLOGINREQ, GETLOGINSUCCESS, POSTFAILREGISTER, POSTREQREGISTER, POSTSUCCESSREGISTER } from "./actiontype"


export const  userregister = (data)=> (dispatch)=> {
    // console.log(data);
      dispatch({type:POSTREQREGISTER})
    return  axios.post("http://localhost:8080/user/register" , data)
      .then((res) => {
        // console.log(res)
         dispatch({type:POSTSUCCESSREGISTER, payload:res.data.message})
      })
      .catch((err) => dispatch({type:POSTFAILREGISTER}))
 }


 export const getLoginUser =(data)=>  (dispatch)=> {
    dispatch({type:GETLOGINREQ})
   return  axios.post("http://localhost:8080/user/login", data)
     .then((res) => {
        // console.log(res);
       dispatch({type:GETLOGINSUCCESS, payload:res.data})
     })
     .catch((err)=> dispatch({type:GETLOGINFAIL}))
 }


 export const Logoutuser = (dispatch)=> {
    dispatch({type:"LOGOUT"})
 }