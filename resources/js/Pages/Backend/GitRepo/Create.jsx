import React, { useState } from 'react'
import { Modal, Label,TextInput, Button} from 'flowbite-react'
import { router, useForm, usePage } from '@inertiajs/react'
import toast, { Toaster } from 'react-hot-toast';

const Create = ({openCreateModal, setOpenCreateModal}) => {
    const {repos} = usePage().props;
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const {data, setData, reset} = useForm({
        'name' : "",
        'description' : '',
    })

    function submit(e) {
        e.preventDefault();
        const filteredItem = repos.filter(item => item.name == data.name);
        if(filteredItem.length > 0 ) {
          setErrors({info : "Repository name already exists"});
          return false
        }
        setLoading(true)
        router.post(route('admin.gitrepo.store'), data, {
            onSuccess : () => {
                setLoading(false)
                setOpenCreateModal(false)
                toast.success("Repo created successfully");
                reset();
            },
            onError : (err) => {
                setErrors(err)
            }
        })
    }

  return (
    <div>
      <Modal show={openCreateModal} size="md" onClose={() => setOpenCreateModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form action="" onSubmit={submit}>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white"> Create Repository </h3>
                {/* errors  */}
                {errors && errors.info && 
                  <div className='my-3 text-red-700 font-bold text-sm'> 
                    {errors.info}
                  </div>
                }
                <div>
                  <div className="mb-2 block">
                      <Label htmlFor="email" value="Repository Name" />
                  </div>
                  <TextInput
                      id="name"
                      placeholder="Enter Repository Name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                  />
                  {errors && errors.name && 
                    <div className='my-3 text-red-700 font-bold text-sm'> 
                      {errors.name}
                    </div>
                  }
                </div>
                <div>
                  <div className="mb-2 block">
                      <Label htmlFor="email" value="Description" />
                  </div>
                  <TextInput
                      id="description"
                      placeholder="Enter Description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                  />
                </div>
                <div className="w-full">
                <Button type="submit"> {loading ? "Saving" : "Save"} </Button>
                </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Toaster 
        position='top-right'
      />
    </div>
  )
}

export default Create
