import React from 'react'
import { Breadcrumb, Button } from 'flowbite-react'
import Items from './Items'
import Edit from './Edit'
import { GrTemplate} from 'react-icons/gr'
import { RiPagesLine } from 'react-icons/ri'
import { TbTemplate } from "react-icons/tb";
import { Link, router } from '@inertiajs/react'
import FrontendLayout from '@/Layouts/FrontendLayout'
import toast, { Toaster } from 'react-hot-toast'
import { SectionProvider } from '@/Context/SectionContext'

const Index = ({template_id,page_id,  sections}) => {
  const handleAdd = () => {
      router.post(route('admin.template.section.store'), {page_id : page_id ,template_id : template_id}, {
        onSuccess : () => {
            toast.success("Section created successfully");
        },
        onError : () => {

        }
    })
  }
  return (
    <div>
        <Toaster 
          position='top-center'
        />
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={GrTemplate}>
                        <Link href={route('admin.template.resource.content')} > Templates </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={RiPagesLine}>
                        <Link href={route('admin.template.page', {template_id : template_id})} > Pages </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={TbTemplate}>
                        <Link href="#" > Sections </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Button 
                    onClick={handleAdd}
                > Add Section </Button>
            </div>
        </div>
        {/* page items  */}
        <Items 
            sections={sections}
        />

        {/* Edit modal  */}
        <Edit />
    </div>
  )
}

Index.layout = page => 
<SectionProvider>
  <FrontendLayout children={page} />
</SectionProvider>
export default Index
