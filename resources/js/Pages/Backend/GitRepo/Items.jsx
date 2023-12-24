import React from 'react'
import { Button, Table } from 'flowbite-react'

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
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell> {key + 1} </Table.Cell>
                                    <Table.Cell> {item.name} </Table.Cell>
                                    <Table.Cell> 
                                        <a href={item.clone_url} className='text-indigo-700' target='_blank'> 
                                            {item.clone_url} 
                                        </a>     
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a href={item.url} className='text-indigo-700'  target='_blank'>  {item.url} </a>
                                    </Table.Cell>
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
  )
}

export default Items
