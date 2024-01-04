import { Checkbox } from 'flowbite-react'
import React from 'react'

const Validation = ({field}) => {
  return (
    <div>
      {/* General Validation  */}
      <p className='font-bold text-2xl my-2'> Validation </p>
      {/* Required field  */}
      <div className="flex items-start my-3">
        <Checkbox 
            value={false}
            className='me-3'
        />
        <div className='flex flex-col'>
            <p className='font-bold text-md'> Required Field </p>
            <p className='text-sm text-gray-500'> You won't be able to publish if this component is empty. </p>
        </div>
      </div>
      {/* Unique field  */}
      <div className="flex items-start my-3">
        <Checkbox 
            value={false}
            className='me-3'
        />
        <div className='flex flex-col'>
            <p className='font-bold text-md'> Unique Field </p>
            <p className='text-sm text-gray-500'> You won't be able to publish if there is an existing entry with identical content. </p>
        </div>
      </div>
    </div>
  )
}

export default Validation
