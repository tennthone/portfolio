import React, { useState } from 'react'
import { Modal, Button} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { router } from '@inertiajs/react'


const Delete = ({openDeleteModal, setOpenDeleteModal, repoName}) => {
    const [loading, setLoading] = useState(false)
    const handleClick =() => {
        setLoading(true)
        router.delete(route('admin.gitrepo.delete', repoName), {
            onSuccess : () => {
                setLoading(false)
                setOpenDeleteModal(false)
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
  return (
    <div>
      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this repository?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleClick(false)}>
                {loading ? "Deleting" : "Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Delete
