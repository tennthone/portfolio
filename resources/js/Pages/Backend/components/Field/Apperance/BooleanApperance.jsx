import { DataContext } from '@/Context/DataContext'
import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useContext } from 'react'

const BooleanApperance = () => {
  const {data, setData} = useContext(DataContext);

  const handleTrueFieldChange = (e) => {
    setData('apperance', {...data.apperance, bool : {
      ...data.apperance.bool,
      trueLable : e.target.value
    }})
  }
  const handleFalseFieldChange = (e) => {
    setData('apperance', {...data.apperance, bool : {
      ...data.apperance.bool,
      falseLable : e.target.value
    }})
  }

  return (
    <div className='my-2'>
        {/* for true condition  */}
        <div className='my-3'>
          <Label> True Condition Custom Label </Label>
          <TextInput 
            placeholder='Add True Value'
            value={data.apperance?.bool.trueLable ?? "Yes"}
            className='mt-2'
            onChange={(e) => handleTrueFieldChange(e)}
          />
        </div>
        {/* For false condition  */}
        <div className='my-3'>
          <Label> False Condition Custom Label </Label>
          <TextInput 
            placeholder='Add False Value'
            value={data.apperance?.bool.falseLable ?? "No"}
            className='mt-2'
            onChange={(e) => handleFalseFieldChange(e)}
          />
        </div>
    </div>
  )
}

export default BooleanApperance
