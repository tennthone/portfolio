import React from 'react'
import { Modal, Label, Button, TextInput } from 'flowbite-react'
import { useForm } from '@inertiajs/react';

const CreateFolder = () => {
  const {data, setData} = useForm({
    'name' : '',
  })
  function submit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <Modal show={openCommitModal} size="md" onClose={() => setOpenCommitModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={submit}>
            <div className="space-y-6">
              {/* template name  */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Add Commit Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Enter Commit Name"
                  value={data.commit_name}
                  onChange={(event) => setData('commit_name', event.target.value)}
                />
              </div>
              <div className="w-full">
                <Button type='submit' color='purple'> {loading ? "Saving" : "Save"} </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateFolder
