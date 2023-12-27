import React, { useContext } from 'react'
import { useState } from 'react'
import { router } from '@inertiajs/react'
import DeleteModal from '@/Pages/Backend/components/DeleteModal'
import toast, { Toaster } from 'react-hot-toast'
import { FileContext } from '@/Context/FileContext'

const Delete = () => {
    const {
        openDeleteModal, 
        setOpenDeleteModal, 
        filePath, 
        deleteRoute, 
        title
    } = useContext(FileContext)

    const [loading, setLoading] = useState(false)
    
    const handleClick =() => {
        setLoading(true)
        router.post(route(deleteRoute),{base_path : filePath}, {
            onSuccess : () => {
                setLoading(false)
                setOpenDeleteModal(false)
                toast.success(title + " deleted successfully");
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
            title={title}
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
