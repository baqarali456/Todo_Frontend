import React, { useState } from 'react'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';


function SignUp() {
  const {register,handleSubmit,setValue} = useForm();

  const [error,setError] = useState('')
  const navigate = useNavigate()

  const signup = async(data) =>{
    console.log(data)
    setError('');
    try {
      await axios.post('https://todobackend-p71y.onrender.com/api/v1/users/register-user',data);

     setValue('username','')
     setValue('password','')
     setValue('email','')

     navigate('/login')

    } catch (error) {
      console.log(error);
      setError(error.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(signup)} className='rounded p-3 shadow bg-sky-600 text-white  w-80'>
      <h1 className=' font-bold text-2xl my-1 text-center'>SignUp</h1>
       <Input
       type="text"
       label="Username"
       {...register('username',{required:true})}
       />
       <Input
       type="email"
       label="Email"
       placeholder="Enter Email"
       {...register('email',{required:true})}
       />
       <Input
       type="password"
       label="Password"
       placeholder="Enter Password"
       {...register('password',{required:true})}
       />

       {
        error && <p className='text-sm bg-red-500 p-2 '>{error}</p>
       }

      <Button type='submit' className='' bgColor='bg-red-500'>SignUp</Button>

      

    </form>
  )
}

export default SignUp