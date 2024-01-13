import { DataContext } from '@/Context/DataContext'
import { TextInput } from 'flowbite-react'
import React from 'react'
import { useContext } from 'react'

const HelperText = () => {
    const {data, setData} = useContext(DataContext);

  return (
    <div className='my-5'>
      <p className="font-bold text-2xl my-2"> Helper Text </p>
      <TextInput 
        value={data.apperance?.helper_text}
        onChange={e => setData('apperance', {...data.apperance, helper_text : e.target.value})}
        placeholder='Enter Helper Text'
        helperText="This help text wil show up below the field"
      />
    </div>
  )
}

export default HelperText
