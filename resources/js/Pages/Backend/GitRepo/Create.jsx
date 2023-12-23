import React, { useState } from 'react'
import { Modal, Label,TextInput, Button} from 'flowbite-react'
import { router, useForm } from '@inertiajs/react'

const Create = ({openCreateModal, setOpenCreateModal}) => {
    const [loading, setLoading] = useState(false)
    const {data, setData, reset} = useForm({
        'name' : "",
        'description' : '',
    })

    function submit(e) {
        e.preventDefault();
        setLoading(true)
        router.post(route('admin.gitrepo.store'), data, {
            onSuccess : () => {
                setLoading(false)
                setOpenCreateModal(false)
                reset();
            },
            onError : (err) => {
                console.log(err)
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
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Repository Name" />
                </div>
                <TextInput
                    id="name"
                    placeholder="Enter Repository Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
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
                    required
                />
                </div>
                <div className="w-full">
                <Button type="submit"> {loading ? "Saving" : "Save"} </Button>
                </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Create
