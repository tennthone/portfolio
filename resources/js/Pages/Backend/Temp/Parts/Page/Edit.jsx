import React, { useContext, useState } from 'react'
import { Label, FloatingLabel} from 'flowbite-react'
import { useForm, usePage } from '@inertiajs/react'
import { PageContext } from '@/Context/PageContext'
import MyModal from '@/Pages/Backend/components/MyModal'

const Edit = () => {
    const {openEditModal, setOpenEditModal, data, setData, reset, pageId} = useContext(PageContext)
    return (
            <MyModal 
                children={<BodyContent data={data} setData={setData}/>}
                openModal={openEditModal}
                setOpenModal={setOpenEditModal}
                routeName="admin.template.page.update"
                param={pageId}
                name="Page"
                heading="Edit Page"
                data={data}
                reset={reset}
            />
    )
}

export default Edit

export const BodyContent = ({data, setData}) => {
    return (
        <div className="space-y-6">
            {/* template name  */}
            <div>
            <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
            </div>
            <FloatingLabel
                variant='outlined'
                label='name'
                value={data.name}
                onChange={(event) => setData('name', event.target.value)}
            />
            </div>
            {/* remote url  */}
            <div>
            <div className="mb-2 block">
                <Label htmlFor="remote url" value="Add Variable Name" />
            </div>
            <FloatingLabel
                variant='outlined'
                label='variable'
                value={data.value}
                onChange={(event) => setData('value', event.target.value)}
            />
            </div>
        </div>
    )
}