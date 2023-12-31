import React from 'react'
import { Button, Table, Tooltip } from 'flowbite-react'
import { FaTrash } from 'react-icons/fa6'
import { useContext } from 'react'
import { SectionDataContext } from '@/Context/SectionDataContext'

const Item = ({item}) => {
    const {handleOpenDeleteModal} = useContext(SectionDataContext)
  return (
    <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
               {item.id}
            </Table.Cell>
            <Table.Cell>
                {item.component_name}
            </Table.Cell>
            <Table.Cell> {item.name} </Table.Cell>
            <Table.Cell>
                <Tooltip content="Component Design ဖျက်သိမ်းမည်">
                        <FaTrash 
                            className='text-red-700'  
                            size={20}
                            onClick={() =>handleOpenDeleteModal(item.id)}
                        />
                </Tooltip>
            </Table.Cell>
        </Table.Row>
  )
}

export default Item
