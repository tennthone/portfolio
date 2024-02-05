import React from 'react'
import { Table } from 'flowbite-react'
import { usePage } from '@inertiajs/react'
import Component from './Component';

const Items = () => {
    const {cpts} = usePage().props;
  return (
    <div className='overflow-x-auto my-5'>
      <Table striped>
            <Table.Head>
                <Table.HeadCell> No </Table.HeadCell>
                <Table.HeadCell> Name </Table.HeadCell>
                <Table.HeadCell> Variable Name </Table.HeadCell>
                <Table.HeadCell> Loop ပတ်လို့ရသလား </Table.HeadCell>
                <Table.HeadCell> Loop အရေအတွက် </Table.HeadCell>
                <Table.HeadCell> <span className="sr-only">Edit</span> </Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {   
                    cpts.length > 0 ? 
                    cpts.map(item => (
                        <Component item={item} key={item.id}/>
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
