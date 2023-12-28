import { Table } from 'flowbite-react';
import Content from './Content';
import { usePage } from '@inertiajs/react';

const Items = () => {
  const {templates} = usePage().props;
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
            templates.length > 0 ?
            templates.map(item => (
              <Content key={item.id} item={item} />
            )) : 
            <Table.Cell className='text-red-700'> No Data Here </Table.Cell>
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default Items;
