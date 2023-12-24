import React, { useEffect, useState } from 'react'
import { Modal, TextInput, Label, Button, Toast } from 'flowbite-react'
import { router, useForm, usePage } from '@inertiajs/react'
import {toast,  Toaster } from 'react-hot-toast'

const Commit = ({openCommitModal, setOpenCommitModal, templateId}) => {
    const [loading, setLoading] = useState(false)
    const {flash} = usePage().props;

    useEffect(() => {
      if(flash.message) {
        toast.error(flash.message.message)
      }
    }, [flash.message]);
    
    const {data, setData, reset} = useForm({
        'commit_name' : "",
    });
    function submit(e) {
        e.preventDefault();
        setLoading(true)
        router.post(route('admin.gitaction.push'), {data : data, template_id : templateId}, {
            onSuccess : () => {
                setLoading(false)
                setOpenCommitModal(false)
                if(!flash.message) {
                  toast.success("Commit Successfully");
                }
                reset();
            },
            onError : (err) => {
                
            }
        });
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
      <Toaster 
        position='top-right'
      />
    </div>
  )
}

export default Commit
