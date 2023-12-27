import React, { useState } from 'react'
import { Label, FloatingLabel} from 'flowbite-react'
import { useForm } from '@inertiajs/react'
import MyModal from './MyModal'

const CreateResource = ({
    openCreateModal,
    setOpenCreateModal
}) => {
    const {data, setData, reset} = useForm({
        name : "",
        remote_url : ""
    })

    const [errors, setErrors] = useState([]);
    return (
            <MyModal 
                children={<BodyContent data={data} setData={setData} errors={errors} />}
                openModal={openCreateModal}
                setOpenModal={setOpenCreateModal}
                routeName="admin.template.store"
                name="Resource"
                param=""
                data={data}
                reset={reset}
                errors={errors}
                setErrors={setErrors}
            />
        )
}

export default CreateResource

export const BodyContent = ({data, setData, errors}) => {
    return (
        <div className="space-y-6">
            {/* template name  */}
            <div>
            <div className="mb-2 block">
                <Label htmlFor="name" value="Add Name" />
            </div>
            <FloatingLabel 
                variant="outlined" 
                label="Template name" 
                value={data.name}
                onChange={(event) => setData('name', event.target.value)}
            />
            {
                errors && errors.name && <div className='text-red-700 my-3'> {errors.name} </div>
            }
            </div>
            {/* remote url  */}
            <div>
            <div className="mb-2 block">
                <Label htmlFor="remote url" value="Add GitHub Remote Url" />
            </div>
            <FloatingLabel
                variant="outlined" 
                label='Remote Url'
                value={data.remote_url}
                onChange={(event) => setData('remote_url', event.target.value)}
            />
            {
                errors && errors.remote_url && <div className='text-red-700 my-3'> {errors.remote_url} </div>
            }
            </div>
        </div>
    )
}