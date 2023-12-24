import { router, useForm } from '@inertiajs/react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

const Create = ({openCreateModal, setOpenCreateModal}) =>  {
  const [loading, setLoading] = useState(false)
  const {data, setData, reset} = useForm({
    'name' : "",
    'remote_url' : '',
  });

  function submit(e) {
    e.preventDefault()
    setLoading(true)
    router.post(route('admin.template.store'), data, {
      onSuccess : () => {
        setLoading(false)
        setOpenCreateModal(false)
        reset()
      },
      onError : (err) => {
        console.log(err)
      }
    })
  }

  return (
    <>
      <Modal show={openCreateModal} size="md" onClose={() => setOpenCreateModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={submit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white"> Create Resource </h3>
              {/* template name  */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Enter Template Name"
                  value={data.name}
                  onChange={(event) => setData('name', event.target.value)}
                />
              </div>
              {/* remote url  */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="remote url" value="Add GitHub Remote Url" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Enter GitHub Remote Url"
                  value={data.remote_url}
                  onChange={(event) => setData('remote_url', event.target.value)}
                />
              </div>
              <div className="w-full">
                <Button type='submit' color='purple'> {loading ? "Saving" : "Save"} </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Create;
