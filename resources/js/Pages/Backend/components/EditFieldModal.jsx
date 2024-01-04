import { DataContext } from '@/Context/DataContext'
import { usePage } from '@inertiajs/react'
import { Label, Modal, TextInput } from 'flowbite-react'
import React from 'react'
import { useContext } from 'react'
import { VscSymbolField } from 'react-icons/vsc'
import Validation from './Validation/Validation'

const EditFieldModal = () => {
  const {openEditFieldModal, setOpenEditFieldModal} = useContext(DataContext)
  const {field} = usePage().props;

  return (
    <Modal 
      size="5xl"
      show={openEditFieldModal} 
      onClose={() => setOpenEditFieldModal(false)}
    >
        <Modal.Header>
          <div className="flex">
            {/* icon  */}
            <VscSymbolField size={30} className="me-3"/>
              <div className="">
                  <p className="text-lg font-bold">
                      {field.name}
                  </p>
                  <p className="text-sm"> {field.type} </p>
              </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* filed name  */}
          <div className='my-3'>
            <Label> Enter Name </Label>
            <TextInput 
                placeholder='Name'
                helperText="This is a hint text"
                className='my-3'
                value={field?.name}
            />
          </div>
          {/* filed value  */}
          <div className='my-3'>
            <Label> Enter Variable Name </Label>
            <TextInput 
                placeholder='Variable Name'
                helperText="This is a hint text"
                className='my-3'
                value={field?.value}
                readOnly
            />
          </div>
          {/* Validation  */}
          <Validation field={field} />
        </Modal.Body>
        <Modal.Footer>
            
        </Modal.Footer>
    </Modal>
  )
}

export default EditFieldModal
