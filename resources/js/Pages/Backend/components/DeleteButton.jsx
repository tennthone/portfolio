import React from 'react'
import { FaTrash } from 'react-icons/fa6'
import { Tooltip } from 'flowbite-react'

const DeleteButton = ({param, handleDelete}) => {
  return (
    <Tooltip content="ဖျက်သိမ်းမည်">
        <FaTrash 
            size={20}
            onClick={() => handleDelete(param)}
            className='text-red-700'
        />
    </Tooltip>
  )
}

export default DeleteButton
