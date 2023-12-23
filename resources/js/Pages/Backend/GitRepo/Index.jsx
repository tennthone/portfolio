import FrontendLayout from '@/Layouts/FrontendLayout'
import React, { useState } from 'react'
import { Button, Table } from 'flowbite-react'
import Create from './Create'
import Delete from './Delete'

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
        <div className="my-5">
            <Table>
                <Table.Head>
                <Table.HeadCell> No </Table.HeadCell>
                <Table.HeadCell> Name </Table.HeadCell>
                <Table.HeadCell> Clone Url </Table.HeadCell>
                <Table.HeadCell> Site Url </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                        {
                            repos.map((item, key) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell> {key + 1} </Table.Cell>
                                    <Table.Cell> {item.name} </Table.Cell>
                                    <Table.Cell> {item.clone_url} </Table.Cell>
                                    <Table.Cell> {item.url} </Table.Cell>
                                    <Table.Cell>
                                    <Button color='failure' onClick={() => handleClick(item.name)}>
                                        Delete
                                    </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                
                </Table.Body>
            </Table>
        </div>

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
