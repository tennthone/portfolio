import { useForm, usePage } from '@inertiajs/react'
import { Label, FloatingLabel, Textarea, Select, Button} from 'flowbite-react';
import React, { useState } from 'react'
import TagsInput from 'react-tagsinput'
import './app.css'

const Details = () => {
    const {template} = usePage().props;
    const [tags, setTags] = useState([])
    const initialData = {
        name : template.name, 
    }
    const {data, setData} = useForm(initialData);
    const handleTags = (value) => {
        setTags(value)
    }

  return (
    <div>
      <div className="flex justify-end my-3">
        <Button type='submit'>
            Save 
        </Button>
      </div>
      {/* template name  */}
      <div className="my-5 border-b-2 border-dashed">
            <div className="flex items-start my-3 mx-5">
                <Label htmlFor='name' className='me-3 w-1/3'>  Template Name <span className='text-red-700'> * </span> </Label>
                <div className="w-2/3">
                    <FloatingLabel 
                        variant="outlined" 
                        label="template name" 
                        value={data.name}
                        helperText='Support for explaining text'
                        size="md"
                        onChange={e => setData('name', e.target.value)}
                    />
                </div>
            </div>
      </div>
      {/* template id  */}
      <div className="my-5 border-b-2 border-dashed">
            <div className="flex items-start my-3 mx-5">
                <Label htmlFor='name' className='me-3 w-1/3'>  Template Id <span className='text-red-700'> * </span> </Label>
                <div className="w-2/3">
                    <FloatingLabel 
                        variant="outlined" 
                        label="template id" 
                        value={data.name}
                        helperText='Hint text to support user'
                        size="md"
                    />
                </div>
            </div>
      </div>
      {/* category  */}
      <div className="my-5 border-b-2 border-dashed">
            <div className="flex items-start my-3 mx-5">
                <Label htmlFor='name' className='me-3 w-1/3'>  Category <span className='text-red-700'> * </span> </Label>
                <div className="w-2/3">
                <Select id="countries" required helperText="Category used in template">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                </Select>
                </div>
            </div>
      </div>
      {/* tags  */}
      <div className="my-5 border-b-2 border-dashed">
            <div className="flex items-start my-3 mx-5">
                <Label htmlFor='name' className='me-3 w-1/3'>  Tags <span className='text-red-700'> * </span> </Label>
                <div className="w-2/3">
                    <TagsInput 
                        value={tags}
                        onChange={(value) => handleTags(value)}
                        className='w-full rounded-md'
                    />
                </div>
            </div>
      </div>
      {/* description  */}
      <div className="my-5 border-b-2 border-dashed">
            <div className="flex items-start my-3 mx-5">
                <Label htmlFor='name' className='me-3 w-1/3'>  Description  </Label>
                <div className="w-2/3">
                    <Textarea 
                        label="description"
                        helperText="Helper text to describe the template"
                    />
                </div>
            </div>
      </div>
    </div>
  )
}

export default Details
