import React, { useEffect, useState } from 'react'
import { IconButton, TextField, Checkbox } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
    const [allData, setAllData] = useState([])
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);
    const [enterTodo, setEnterTodo] = useState("");
    const [addTodo, setAddTodo] = useState("")

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


    const handleCompleted = (value) => {

        const putOption = {
            method: 'PUT',
            body: JSON.stringify({id:value.id, title: value.title, completed: !value.completed}),
            headers: {
                'Content-Type':`application/json`
            },
        }

        fetch(`http://localhost:8080/todoData/${value.id}`, putOption)
            .then((response) => fetchTodos())

    }

    const handleDelete = (value) => {

        const deleteOption = {
            method: 'DELETE'
        }

        fetch(`http://localhost:8080/todoData/${value.id}`, deleteOption)
            .then((response) => fetchTodos())

    }

    
    const handleAddTodo = (e) => {
        const inputTodo = e.target.value
        const trimedTodo = inputTodo.trim()

        setEnterTodo(inputTodo)
        setAddTodo(trimedTodo)
    }


    const handleClickAddTodo = () => {

        if (!Object.is(addTodo, "")){
            const postOption = {
                method: 'POST',
                body: JSON.stringify({title: addTodo, completed: false}),
                headers: {
                    'Content-Type':`application/json`
                },
            }
    
            fetch('http://localhost:8080/todoData',postOption)
                .then((response) => fetchTodos())

            
            setEnterTodo("")

        } else {
            alert("Todoが記入されていません")
        }

    }

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
                        <li key={value.id}>
                            {/* <Checkbox key={value.id} sx={{ color: "white" }} onChange={() => {value.completed = true; loadTodos();}} /> */}
                            <Checkbox sx={{ color: "white", '&.Mui-checked': { color: "white", } }} onChange={() => { handleCompleted(value); fetchTodos();}} />
                            <div className='TodoName'>{value.title}</div>
                            <DeleteIcon sx={{cursor: "pointer"}} onClick={() => {handleDelete(value)}}/>
                        </li>
                    )
                    })}
                </ul>
            </div>
            <div className='TodoList'>
                <h1>Done</h1>
                <ul>{dones.map((value) => {
                    return (
                        <li key={value.id}>
                            <Checkbox sx={{ color: "white", '&.Mui-checked': { color: "white", }}} onChange={() => { handleCompleted(value); fetchTodos()}} defaultChecked />
                            <div className='TodoName TodoDone'>{value.title}</div>
                            <DeleteIcon sx={{cursor: "pointer"}} onClick={() => {handleDelete(value)}}/>
                        </li>
                    )
                    })}
                </ul>
            </div>
        </div>
        <div className='AddTodo'>
            <TextField fullWidth value={enterTodo} variant='standard' label="Enter New Todo"  size='small' onChange={handleAddTodo} sx={{backgroundColor: "white", color:"#4c6585"}}></TextField>
            <IconButton size='small' onClick={handleClickAddTodo}><AddIcon  sx={{color: "white"}} /></IconButton>
        </div>
    </div>
  )
}

export default TodoList