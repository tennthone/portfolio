import { router } from '@inertiajs/react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MyModal = ({
        openModal, 
        setOpenModal, 
        children,
        routeName,
        heading,
        setErrors,
        name,
        data,
        param
    }) =>  {
  const [loading, setLoading] = useState(false)

  function submit(e) {
    e.preventDefault()
    setLoading(true)
    router.post(route(routeName, param), data, {
      onSuccess : () => {
        setLoading(false)
        setOpenModal(false)
        toast.success(name + "created successfully");
        reset()
      },
      onError : (err) => {
        setLoading(false)
        setErrors(err)
      }
    })
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header> {heading} </Modal.Header>
        <Modal.Body>
          <form onSubmit={submit}>
            <div className="space-y-6">
              {children}
              <div className="w-full">
                <Button 
                    type='submit' 
                    isProcessing={loading}
                    processingLabel='Saving'
                > 
                    Save
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;
