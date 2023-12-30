import FrontendLayout from '@/Layouts/FrontendLayout'
import Items from './Items'
import { RiPagesLine } from "react-icons/ri";
import { Link } from '@inertiajs/react';
import { Breadcrumb} from 'flowbite-react';
import { GrTemplate } from "react-icons/gr";
import Edit from './Edit';
import { PageProvider } from '@/Context/PageContext';
import { DataProvider } from '@/Context/DataContext';
import CreateFieldModal from '@/Pages/Backend/components/CreateFieldModal';
import FieldModal from '@/Pages/Backend/components/FieldModal';
import { Toaster } from 'react-hot-toast';

const Index = ({pages, template}) => {
  return (
    <div>
        <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={GrTemplate}>
                        <Link href={route(template.isResource ? 'admin.template.resource' : 'admin.template.website')} > Templates </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item icon={RiPagesLine}>
                        <Link href="" > {template.name}  </Link>
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

        <Toaster position="top-right" />
    </div>
  )
}

Index.layout = page => 
<DataProvider>
    <PageProvider>
        <FrontendLayout children={page} />
    </PageProvider>
</DataProvider>
export default Index
