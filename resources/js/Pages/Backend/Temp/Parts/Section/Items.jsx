import React from 'react'
import { Table } from 'flowbite-react'
import Section from './Section'

const Items = ({sections}) => {
  return (
    <div className='my-5'>
      <Table>
        <Table.Head>
          <Table.HeadCell> No </Table.HeadCell>
          <Table.HeadCell> Name </Table.HeadCell>
          <Table.HeadCell> Variable Name </Table.HeadCell>
          <Table.HeadCell> isResource </Table.HeadCell>
          <Table.HeadCell> isVisible </Table.HeadCell>
          <Table.HeadCell> isPremium </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            sections.map(item => (
              <Section  key={item.id} item={item}/>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default Items
