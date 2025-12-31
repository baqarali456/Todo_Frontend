import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../store/authSlice";
import TodoForm from "../components/TodoForm";

function Home() {
  const dispatch = useDispatch();
  const authStatus = useSelector(state=>state.authStatus);
  const todos = useSelector(state=>state.todos) || [];
  

  useEffect(()=>{
    if(authStatus){
      axios.get('https://todobackend-p71y.onrender.com/api/v1/todos/getAll-userTodos',{withCredentials:true})
      .then(response=>{
           dispatch(getTodos(response.data.data.todos))
      })
      .catch(error=>console.log(error))
    }



  },[])

  const handleTodos = async(e) =>{
      if(e.target.innerText === "Update"){
         let todo = todos.find(ele=>ele._id === e.target.parentElement.parentElement.getAttribute('key'))
         if(todo){
           <TodoForm todo={todo}/>
         }
         else{
          console.log(todo);
         }
      }
      if(e.target.innerText === "Delete"){
        let todo = todos.find(ele=>ele._id === e.target.parentElement.parentElement.getAttribute('key'))
         try {
          await axios.delete(`https://todobackend-p71y.onrender.com/api/v1/todos/delete-todo/${todo._id}`,{withCredentials:true})
         } catch (error) {
          console.log(error)
         }
      }
  }

  return (
    authStatus ? <div onClick={handleTodos} className=" flex flex-wrap gap-4">
      {
        todos.length > 0 ? todos.map(todo=>(
          <div key={todo._id} className=" bg-orange-500 text-white rounded shadow p-3 w-50">
            <h1 className=" text-2xl font-semibold">{todo.title}</h1>
            <p className=" p-1 text-sm ">{todo.Description}</p>
            <div className=" flex items-center justify-between p-2">
               <button className="bg-green-500 rounded shadow p-2">Update</button>
               <button className="bg-red-500 rounded shadow p-2">Delete</button>
            </div>

          </div>
        )):<h1 className=" text-2xl font-bold">No Todos in</h1>
      }
    </div> : <h1 className=" font-bold uppercase text-2xl">Please Login</h1>
  )
}

export default Home