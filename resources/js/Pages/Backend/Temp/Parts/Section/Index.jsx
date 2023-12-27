import React from 'react'
import { Breadcrumb, Button } from 'flowbite-react'
import Items from './Items'
import Edit from './Edit'
import { GrTemplate} from 'react-icons/gr'
import { RiPagesLine } from 'react-icons/ri'
import { TbTemplate } from "react-icons/tb";
import { Link} from '@inertiajs/react'
import FrontendLayout from '@/Layouts/FrontendLayout'
import  { Toaster } from 'react-hot-toast'
import { SectionProvider } from '@/Context/SectionContext'
import { DataProvider } from '@/Context/DataContext'
import FieldModal from '@/Pages/Backend/components/FieldModal'
import CreateFieldModal from '@/Pages/Backend/components/CreateFieldModal'

const Index = ({template_id,sections, page}) => {
  return (
    <div>
        <Toaster 
          position='top-center'
        />
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={GrTemplate}>
                        <Link href={route('admin.template.resource')} > Templates </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={RiPagesLine}>
                        <Link href={route('admin.template.page', {template_id : template_id})} > Pages </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={TbTemplate}>
                        <Link href="#" > {page.name} </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
        {/* page items  */}
        <Items  />

        {/* Edit modal  */}
        <Edit />


        {/* Field Modal  */}
        <FieldModal />

        {/* Create Field modal  */}
        <CreateFieldModal />
    </div>
  )
}

Index.layout = page => 
<DataProvider>
<SectionProvider>
  <FrontendLayout children={page} />
</SectionProvider>
</DataProvider>
export default Index
