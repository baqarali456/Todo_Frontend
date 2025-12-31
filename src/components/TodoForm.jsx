import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from "./Input"
import Button from "./Button"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoForm({todo}) {

    const navigate = useNavigate()

    const {register,handleSubmit} = useForm({
        defaultValues:{
            Title:todo?.Title || "",
            Description:todo?.Description || "",
        }
    })

    const [error,setError] = useState('');

    const handleTodo = async(data) =>{
        setError('');
        try {
            if(todo){
               await axios.patch(`https://todobackend-p71y.onrender.com/api/v1/todos/update-todo/${todo._id}`,data,{
                withCredentials:true
              })
            }
            else{
              await axios.post('https://todobackend-p71y.onrender.com/api/v1/todos//add-todo',data,{withCredentials:true})
            }
            navigate('/')
        } catch (error) {
            console.log(error)
            setError(error.response?.data.message || "some error")
        }
    }


  return (
    <form onSubmit={handleSubmit(handleTodo)} className=' bg-orange-500 rounded shadow p-4 w-96'>
        <h1 className=' text-center p-1 font-bold tracking-wide'>{todo?"Edit Todo":"Add Todo"}</h1>
         <Input
         placeholder="Title"
         {...register('Title',{required:true})}
         
         />
         <Input
         placeholder="Description"
         {...register('Description')}
         />
         {
            error && <p className=' text-sm text-red-500'>{error}</p>
         }
         <Button type='submit' bgColor={todo?"bg-green-500":"bg-blue-500"} className=' '>{todo?"Update":"Add"}</Button>
    </form>
  )
}

export default TodoForm