import { useState } from 'react';
import './Todo.css';
function Todo(){

    // var todo = {
    //     "userid": 1,
    //     "id": 1,
    //     "title": "heyy",
    //     "Completed": true
    // }

var [todo, setTodo] = useState({
    "userid": 1,
    "id": 1,
    "title": "hiii",
    "Completed": true

});
var fetchClick = () => fetch("https://jsonplaceholder.typicode.com/todos/1")
.then(res => res.json())//first convert into json
.then(res => {
    // todo = res;
    setTodo(res);
    console.log(todo);
}
    )
.catch(err=>console.log(err));
    return(

        <div>
            <h1 className='todotitle'> Todo for the day</h1>
            <button onClick={fetchClick} className='btn btn-primary'>Get Data</button>
            <div className='alert alert-success tododiv'>

                Id: {todo.id}
                <br />
                Title: {todo.title}
                <br />
                Status: <button className='btn btn-success' disabled = {!todo.Completed}> Buy </button>

            </div>
        </div>

    );
}

export default Todo;

