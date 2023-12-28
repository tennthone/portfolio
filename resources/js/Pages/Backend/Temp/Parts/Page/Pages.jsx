import React, { useState } from 'react'
import { Table, Pagination} from 'flowbite-react'
import { usePage } from '@inertiajs/react'
import Page from './Page'

const Pages = () => {
    const {pages} = usePage().props;
    const [currentPage, setCurrentPage] = useState(1)
    const onPageChange = () => {
        // do something 
    }
  return (
    <>
    <Table>
        <Table.Head>
        <Table.HeadCell> No </Table.HeadCell>
        <Table.HeadCell> Name </Table.HeadCell>
        <Table.HeadCell> Variable Name </Table.HeadCell>
        <Table.HeadCell> isResource </Table.HeadCell>
        <Table.HeadCell>
            <span className="sr-only">Edit</span>
        </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {
            pages.length > 0 ? 
            pages.map(item => (
              <Page  key={item.id} item={item}/>
              )) : 
            <Table.Cell className='text-red-700 text-center'> No Data Here  </Table.Cell>
        }
        </Table.Body>
    </Table>
    <div className="flex md:justify-end overflow-x-auto sm:justify-center my-3">
      {
        pages.length > 0  && <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
      }
    </div>
    </>
  )
}

export default Pages
