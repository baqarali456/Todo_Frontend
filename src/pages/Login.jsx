import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authLogin,authLogout} from "../store/authSlice"
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error,setError] = useState('')

  const {register,handleSubmit,setValue} = useForm();

  const login = async(data) =>{
    setError('');
    console.log(data);
    try {
      const response = await axios.post('https://todobackend-p71y.onrender.com/api/v1/users/login-user',data,{
        withCredentials:true
      });
      if(response.data){
        dispatch(authLogin(response.data.data.user))
        setValue('username','')
        setValue('password','')
        navigate('/');
      }
      else{
        dispatch(authLogout())
      }
    } catch (error) {
      console.log(error);
        setError(error.response?.data.message || "some network error")
    }
  }

  return (
    <form onSubmit={handleSubmit(login)} className=' rounded shadow p-4 bg-blue-700 text-white w-96'>
        <Input
         label="Username"
         placeholder="Enter your Username" 
         type="text"
         {...register("username",{required:true})}
        />
        <Input
         label="Password"
         placeholder="Enter Password" 
         type="password"
         {...register("password",{required:true})}
        />
        <Button type='submit' bgColor='bg-red-400' key={'button'} className=''>Login</Button>
    </form>
  )
}

export default Login