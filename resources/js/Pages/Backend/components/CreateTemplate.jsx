import React, { useState } from 'react'
import { Label, FloatingLabel} from 'flowbite-react'
import { useForm } from '@inertiajs/react'
import MyModal from './MyModal'

const CreateTemplate = ({
    openModal,
    setOpenModal,
    templateUsage,
}) => {
    const templateData = {
        template_usage : templateUsage,
        name : "",
        remote_url : "",
        template_id : "",
        branch_name : templateUsage == "resource" ? "main" : ""
    }
    const {data, setData, reset} = useForm(templateData)

    const [errors, setErrors] = useState([]);
    return (
            <MyModal 
                children={
                <BodyContent 
                    data={data} 
                    setData={setData} 
                    errors={errors}
                    templateUsage={templateUsage}
                />}
                openModal={openModal}
                setOpenModal={setOpenModal}
                routeName="admin.template.store"
                name="Template"
                heading="Create Template"
                processingLabel='Cloning'
                buttonName='Clone'
                param=""
                data={data}
                reset={reset}
                errors={errors}
                setErrors={setErrors}
            />
        )
}

export default CreateTemplate

export const BodyContent = ({data, setData, errors, templateUsage}) => {
    return (
        <div>
            {/* template name  */}
            
                <div className="my-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Template အမည်" />
                    </div>
                    <FloatingLabel
                        label="Template Name"
                        variant="outlined"
                        helperText="File စနစ်, template ရှာဖွေမှုများတွင် သုံးမည့်အမည်"
                        value={data.name}
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                    />
                </div>
                {
                    errors && errors.name && <div className='text-red-700 my-3'> {errors.name} </div>
                }
            {/* remote url  */}
            {
                templateUsage == 'resource' && 
                <div className='my-3'>
                    <div className="mb-2 block">
                        <Label htmlFor="remote url" value="Add GitHub Remote Url" />
                    </div>
                    <FloatingLabel
                        variant="outlined" 
                        label='Remote Url'
                        value={data.remote_url}
                        helperText='Git repo ထဲမှ clone_url အားထည့်ရန်'
                        onChange={(event) => setData('remote_url', event.target.value)}
                    />
                    {
                        errors && errors.remote_url && <div className='text-red-700 my-3'> {errors.remote_url} </div>
                    }
                </div>
            }
            {/* template id  */}
            {
                templateUsage == "website" &&
                <>
                <div className="my-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Template Id or Clone Url ထည့်ရန်*" />
                    </div>
                    <FloatingLabel
                        label="Template Id or Clone Url"
                        variant="outlined"
                        helperText="Clone မည့် Resource Template ၏ Id သို့မဟုတ် Clone Url အား ထည့်ပေးရန်"
                        value={data.template_id}
                        onChange={(event) =>
                            setData("template_id", event.target.value)
                        }
                    />
                </div>
                {errors && errors.template_id && (
                    <div className="text-red-700"> {errors.template_id} </div>
                )}
                </>
            }
            {/* branch name  */}
            {
                templateUsage == "website" &&
                <>
                <div className="my-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Branch Name ထည့်ရန်*" />
                    </div>
                    <FloatingLabel
                        label="Branch Name"
                        variant="outlined"
                        helperText="clone လိုက်သော template အသစ်အတွက် remote url တွင် အသစ်ဖြစ်ပေါ်မည့် branch name"
                        value={data.branch_name}
                        onChange={(event) =>
                            setData("branch_name", event.target.value)
                        }
                    />
                </div>
                {errors && errors.branch_name && (
                    <div className="text-red-700"> {errors.branch_name} </div>
                )}
                </>
            }
        </div>
    )
}