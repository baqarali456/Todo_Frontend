import { useParams } from "react-router-dom"
import TodoForm from "../components/TodoForm";
import { useSelector } from "react-redux";

function EditTodo() {

    const {todoId} = useParams();
    const todos = useSelector(state=>state.todos)

    const todo = todos.find(ele=>ele._id === todoId)

  return (
     <TodoForm todo={todo}/>
  )
}

export default EditTodo