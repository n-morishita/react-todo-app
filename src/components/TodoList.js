import React, { useEffect, useState } from 'react'
import { IconButton, TextField, Checkbox } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Todo from './Todo';

const TodoList = () => {
    const [allData, setAllData] = useState([])
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);
    const [enterTodo, setEnterTodo] = useState("");
    const [addTodo, setAddTodo] = useState("")

    const Swal = require('sweetalert2');

    // GET
    const fetchTodos = () => {
        fetch("http://localhost:8080/todoData")
            .then((response) => response.json())
            .then((json) => setAllData(json))            
    }

    const loadTodos = () => {
        const newTodos = []
        const newDones = []
        allData.forEach((value) => {
            if(value.completed) {
                newDones.push(value)
            } else {
                newTodos.push(value)
            }
        })
        setTodos(newTodos)
        setDones(newDones)
    }

    useEffect(() => {
        fetchTodos();
    },[])

    useEffect(() => {
        loadTodos()
    },[allData])


    // PUT
    const handleCompleted = (value) => {

        const putOption = {
            method: 'PUT',
            body: JSON.stringify({...value, completed: !value.completed}),
            headers: {
                'Content-Type':`application/json`
            },
        }

        fetch(`http://localhost:8080/todoData/${value.id}`, putOption)
            .then((response) => fetchTodos())

    }

    // DELETE
    const handleDelete = (value) => {

        const deleteOption = {
            method: 'DELETE'
        }

        fetch(`http://localhost:8080/todoData/${value.id}`, deleteOption)
            .then((response) => fetchTodos())

    }

    
    const handleEnterAddTodo = (e) => {
        const inputTodo = e.target.value
        const trimedTodo = inputTodo.trim()

        setEnterTodo(inputTodo)
        setAddTodo(trimedTodo)
    }


    // POST
    const handleClickAddTodo = () => {

        if (!Object.is(addTodo, "")){
            const postOption = {
                method: 'POST',
                body: JSON.stringify({title: addTodo, completed: false, editable: false}),
                headers: {
                    'Content-Type':`application/json`
                },
            }
    
            fetch('http://localhost:8080/todoData',postOption)
                .then((response) => fetchTodos())

            setEnterTodo("")
            setAddTodo("")

            Swal.fire({
                title: 'Success !',
                text: '新しいTodoが登録されました !',
                icon: 'success',
                position: 'top-end',
                iconColor: 'white',
                color: 'white',
                width: '24rem',
                showConfirmButton: false,
                background: '#5ed16c',
                padding: '0 16px',
                toast: true,
                timer: 5000,
                timerProgressBar: true,
              });

        } else {
            // alert("Todoが入力されていません。")
            Swal.fire({
                title: 'Error !',
                text: 'Todoが入力されていません。',
                icon: 'error',
                position: 'top-end',
                iconColor: 'white',
                color: 'white',
                width: '24rem',
                showConfirmButton: false,
                background: '#F27474',
                padding: '0 16px',
                toast: true,
                timer: 5000,
                timerProgressBar: true,
              });
        }

    }

    // const editTodo = (value) => {
    //    value.editActive = !value.editActive
    // }

    window.document.onkeydown = (e) => {
        if (e.key === 'Enter') {
            handleClickAddTodo()
        }
    }

 return (
    <div className='TodoMain'>
        <div className='TodoContainer'>
            <div className='TodoList'>
                <h1>Todo</h1>
                <ul>{todos.map((value) => {
                    return (
                        <Todo value={value} handleCompleted={handleCompleted} handleDelete={handleDelete} fetchTodos={fetchTodos}/>
                    )
                    })}
                </ul>
            </div>
            <div className='TodoList'>
                <h1>Done</h1>
                <ul>{dones.map((value) => {
                    return (
                        <li key={value.id}>
                            <Checkbox sx={{ color: "white", '&.Mui-checked': { color: "white", }}} onChange={() => { handleCompleted(value);}} defaultChecked />
                            <div className='TodoName TodoDone'>{value.title}</div>
                            <DeleteIcon sx={{cursor: "pointer"}} onClick={() => {handleDelete(value)}}/>
                        </li>
                    )
                    })}
                </ul>
            </div>
        </div>
        <div className='AddTodo'>
            <TextField fullWidth value={enterTodo} variant='standard' label="Enter New Todo"  size='small' onChange={handleEnterAddTodo} sx={{backgroundColor: "white", color:"#4c6585"}}></TextField>
            <IconButton size='small' onClick={handleClickAddTodo}><AddIcon  sx={{color: "white"}} /></IconButton>
        </div>
    </div>
  )
}

export default TodoList