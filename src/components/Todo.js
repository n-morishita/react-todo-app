import React, { useRef, useState } from 'react'
import { Checkbox, IconButton, TextField } from "@mui/material"
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';


const Todo = ({ value, handleCompleted, handleDelete, fetchTodos}) => {
    const [editedValue, setEditedValue] = useState("")

    const handleEditValue = (e) => {
        setEditedValue(e.target.value)
    }

    // 編集可能にする
    const handleEditable = (value) => {
        const putOption = {
            method: 'PUT',
            body: JSON.stringify({...value, editable: !value.editable}),
            headers: {
                'Content-Type':`application/json`
            },
        }

        fetch(`http://localhost:8080/todoData/${value.id}`, putOption)
            .then((response) => fetchTodos())
    }


    // TODO 編集を反映させる 空白だとそのまま戻るようにする
    const handleEditUpdate = (value) => {
        const trimedValue = editedValue.trim()

        if (!Object.is(trimedValue, "")){
            const putOption = {
                method: 'PUT',
                body: JSON.stringify({...value, title: editedValue, editable: false}),
                headers: {
                    'Content-Type':`application/json`
                },
            }
    
            fetch(`http://localhost:8080/todoData/${value.id}`, putOption)
                .then((response) => fetchTodos())   
        } else {
            handleEditable(value)
        }

        fetchTodos();

    }


  return (
    <div>
        <li className='TodoItem' key={value.id}>
            {value.editable?
                (<div className='EditTitle'>
                    <TextField multiline rows={1} onChange={handleEditValue} sx={{paddingTop: "5px", marginLeft: "10px", marginRight: "10px", inputSize: "20px"}} label={value.title}  size='small'></TextField>
                    <IconButton size='small' onClick={() => handleEditUpdate(value)}><AddTaskIcon sx={{paddingTop: "5px", paddingRight: "5px", cursor: "pointer", color: "white"}}></AddTaskIcon></IconButton>
                </div>
                )
                :
                (<div>
                    <div className='TodoCheckbox'>
                        <Checkbox sx={{ color: "white", '&.Mui-checked': { color: "white", }}} onChange={() => { handleCompleted(value);}} />
                    </div>
                    <div className='TodoTitle' style={{cursor: "pointer"}} onClick={() => handleEditable(value)}>
                        <div className='MainValue'>{value.title}</div> 
                        <DeleteIcon sx={{cursor: "pointer"}} onClick={() => {handleDelete(value)}}/>
                    </div>
                </div>
                )
            }
        </li>
    </div>
  )
}

export default Todo