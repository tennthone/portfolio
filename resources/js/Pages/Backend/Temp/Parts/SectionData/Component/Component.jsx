import React from 'react'
import { Table } from 'flowbite-react'
import { usePage } from '@inertiajs/react'
import Item from './Item';
import DeleteModal from '@/Pages/Backend/components/DeleteModal';
import { useContext } from 'react';
import { SectionDataContext } from '@/Context/SectionDataContext';

const Component = () => {
    const {section} = usePage().props;
    const {setOpenDeleteModal, openDeleteModal, handleDeleteComponentDesign, loading} = useContext(SectionDataContext)
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell> No </Table.HeadCell>
          <Table.HeadCell> Component Name </Table.HeadCell>
          <Table.HeadCell> Design Name </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only"> Delete </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { 
            section.component_designs.length > 0 ?
            section.component_designs.map(item => (
              <Item key={item.id} item={item} />
            )) : 
            <Table.Cell className='text-red-700'> No Data Here </Table.Cell>
          }
        </Table.Body>
      </Table>

      {/* Delete Modal  */}
      <DeleteModal 
        setOpenModal={setOpenDeleteModal}
        openModal={openDeleteModal}
        title="Remove Component Design"
        handleDelete={handleDeleteComponentDesign}
        loading={loading}
      />
      
    </div>
  )
}

export default Component
