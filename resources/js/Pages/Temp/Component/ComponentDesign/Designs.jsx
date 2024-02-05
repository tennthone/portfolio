import React from 'react'
import { Table } from 'flowbite-react'
import { usePage } from '@inertiajs/react'
import Design from './Design';
import PreviewModal from './Preview/PreviewModal';

const Designs = () => {
    const {cpt_designs} = usePage().props;
  return (
    <div className='overflow-x-auto my-5'>
      <Table striped>
            <Table.Head>
                <Table.HeadCell> No </Table.HeadCell>
                <Table.HeadCell> Name </Table.HeadCell>
                <Table.HeadCell> Variable Name </Table.HeadCell>
                <Table.HeadCell> Preview  </Table.HeadCell>
                <Table.HeadCell> <span className="sr-only">Edit</span> </Table.HeadCell>
            </Table.Head>
            <Table.Body>
                {   
                    cpt_designs.length > 0 ? 
                    cpt_designs.map(item => (
                        <Design item={item} key={item.id}/>
                    )) : 
                    <Table.Row>
                        <Table.Cell className='text-red-700'> No Data Here </Table.Cell>
                    </Table.Row>
                }
            </Table.Body>
        </Table>
        
        {/* Preview Modal  */}
        <PreviewModal />
    </div>
  )
}

export default Designs
