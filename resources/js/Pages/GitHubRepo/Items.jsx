import React from 'react'
import { Button, Table } from 'flowbite-react'
import GitRepo from './GitRepo'

const Items = ({repos, handleClick}) => {
  return (
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
                                <GitRepo 
                                    key={key} 
                                    item={item} 
                                    id={key} 
                                    handleClick={handleClick} 
                                />
                            ))
                        }
                
                </Table.Body>
            </Table>
        </div>
  )
}

export default Items
