import Page from './Page'
import { Toaster } from 'react-hot-toast'
import { Table } from 'flowbite-react'

const Items = ({pages}) => {
 
  return (
    <div className='my-5'>
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
            pages.map(item => (
              <Page  key={item.id} item={item}/>
            ))
          }
        </Table.Body>
      </Table>
      <Toaster 
        position='top-right'
      />
    </div>
  )
}

export default Items
