import React from 'react'
import { Table } from 'flowbite-react'
import { Link } from '@inertiajs/react'
import { useContext } from 'react'
import { DataContext } from '@/Context/DataContext'

const Item = ({item}) => {
    const {handleEdit} = useContext(DataContext);
  return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.id}
        </Table.Cell>
        <Table.Cell>  
            <Link 
            href="#"
            className='text-indigo-700'
            >
                {item.name} 
            </Link>
        </Table.Cell>
        <Table.Cell> {item.value} </Table.Cell>
        <Table.Cell>
            <button 
                type='button' 
                href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                onClick={() => handleEdit(item.id)}
            >
            Edit
            </button>
        </Table.Cell>
        </Table.Row>
  )
}

export default Item
