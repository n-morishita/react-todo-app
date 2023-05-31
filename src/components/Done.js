import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';

const Done = ({value, handleCompleted, handleDelete}) => {
  return (
    <div>
        <li className='TodoItem' key={value.id}>
            <div>
                <div className='TodoCheckbox'>
                    <Checkbox sx={{ color: "white", '&.Mui-checked': { color: "white", }}} onChange={() => { handleCompleted(value);}} defaultChecked />
                </div>
                <div className='TodoTitle'>
                    <div className='MainValue TodoDone'>{value.title}</div>
                    <DeleteIcon sx={{cursor: "pointer"}} onClick={() => {handleDelete(value)}}/>
                </div>
            </div>
        </li>
    </div>
  )
}

export default Done