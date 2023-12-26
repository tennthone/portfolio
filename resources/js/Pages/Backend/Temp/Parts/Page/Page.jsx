import React, { useContext } from 'react'
import { Table, ToggleSwitch} from 'flowbite-react'
import { Link, router, usePage } from '@inertiajs/react'
import toast from 'react-hot-toast'
import { PageContext } from '@/Context/PageContext'

const Page = ({item}) => {
    const {handleEdit} = useContext(PageContext)
    const {template_id} = usePage().props;

    const handleSwitchChange = (state, id) => {
        router.post(route('admin.template.page.change-resource'), {isResource : state, id : id}, {
            onSuccess : () => {
                toast.success("Status changed successfully");
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.id}
        </Table.Cell>
        <Table.Cell>  
            <Link 
            href={route('admin.template.section', {page_id : item.id , template_id : template_id})}
            className='text-indigo-700'
            >{item.name} </Link>
        </Table.Cell>
        <Table.Cell> {item.value} </Table.Cell>
        <Table.Cell>  
            <ToggleSwitch 
                checked={item.isResource == 1 ? true : false} 
                onChange={(state) => handleSwitchChange(state, item.id)} />
        </Table.Cell>
        <Table.Cell>
            <button 
                type='button' 
                href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                onClick={() => handleEdit(item.id)}
            >
            Edit
            </button>
        </Table.Cell>
    </Table.Row>
  )
}

export default Page
