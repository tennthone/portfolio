import React from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'
import { usePage } from '@inertiajs/react'

const DesignData = () => {
    const {designs} = usePage().props;
    const designArr = Object.values(designs)
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell> No </Table.HeadCell>
          <Table.HeadCell> Name </Table.HeadCell>
          <Table.HeadCell> Variable Name </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            designArr.length > 0
            ? designArr.map(item => (
                <Item  key={item.id} item={item}/>
              )) 
            : 
            <Table.Row> 
                <Table.Cell className='text-red-700'> No Data Here </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default DesignData
