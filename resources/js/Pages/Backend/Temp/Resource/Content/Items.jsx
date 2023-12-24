
'use client';

import { Table } from 'flowbite-react';

const Items = ({templates}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell> No </Table.HeadCell>
          <Table.HeadCell> Name </Table.HeadCell>
          <Table.HeadCell> Remote Url </Table.HeadCell>
          <Table.HeadCell> Base Path </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            templates.map(item => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id}
                </Table.Cell>
                <Table.Cell> {item.name} </Table.Cell>
                <Table.Cell> {item.git_info.remote_url} </Table.Cell>
                <Table.Cell> {item.git_info.base_path} </Table.Cell>
                <Table.Cell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default Items;
