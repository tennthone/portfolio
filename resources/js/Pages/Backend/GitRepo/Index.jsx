import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import Create from './Create'
import Delete from './Delete'
import Items from './Items'

const Index = ({repos}) => {
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [repoName, setRepoName] = useState(null)

    const handleClick = (name) => {
        setRepoName(name);
        setOpenDeleteModal(true)
    }
  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <p className="text-xl font-bold"> GitHub Repositories </p>
                <button 
                    type="button"
                    className="bg-indigo-700 text-white p-2 rounded-md" onClick={() => setOpenCreateModal(true)}>
                    Create Repository
                </button>
            </div>
        </div>
        
        <Items  
            repos={repos}
            handleClick={handleClick}
        />

        {/* // create modal  */}
        <Create 
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
        />

        {/* delet modal  */}
        <Delete 
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            repoName={repoName}
        />
    </div>
  )
}

Index.layout = page => <FrontendLayout children={page} />
export default Index
