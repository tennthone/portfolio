import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import DeleteModal from '../components/DeleteModal'
import toast, { Toaster } from 'react-hot-toast'


const Delete = ({openDeleteModal, setOpenDeleteModal, repoName}) => {
    const [loading, setLoading] = useState(false)
    const handleClick =() => {
        setLoading(true)
        router.delete(route('admin.gitrepo.delete', repoName), {
            onSuccess : () => {
                setLoading(false)
                setOpenDeleteModal(false)
                toast.success("Repo deleted successfully");
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
  return (
    <div>
      <DeleteModal 
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        title="repository"
        handleClick={handleClick}
        loading={loading}
      />
      <Toaster 
        position='top-right'
      />
    </div>
  )
}

export default Delete
