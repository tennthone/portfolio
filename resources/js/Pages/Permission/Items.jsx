import { PermissionContext } from '@/Context/PermissionContext';
import { usePage } from '@inertiajs/react'
import { Table} from 'flowbite-react'
import React from 'react'
import { useContext } from 'react';

const Items = () => {
    const {roles} = usePage().props;

    const {handleEdit} = useContext(PermissionContext)

  return (
    <div className='overflow-x-auto my-5'>
        <Table striped>
            <Table.Head>
                <Table.HeadCell> No </Table.HeadCell>
                <Table.HeadCell> Name </Table.HeadCell>
                <Table.HeadCell> <span className="sr-only">Edit</span> </Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {   
                    roles.length > 0 ? 
                    roles.map(item => (
                        <Table.Row>
                            <Table.Cell> {item.id}  </Table.Cell>
                            <Table.Cell> {item.name}  </Table.Cell>
                            <Table.Cell>  
                                <button 
                                    className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                                    onClick={() => handleEdit(item.id)}
                                > Edit </button>
                            </Table.Cell>
                        </Table.Row>
                    )) : 
                    <Table.Row>
                        <Table.Cell> No Data Here </Table.Cell>
                    </Table.Row>
                }
            </Table.Body>
        </Table>
    </div>
  )
}

export default Items
