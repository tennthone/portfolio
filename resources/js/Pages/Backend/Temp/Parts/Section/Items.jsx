import React, { useContext } from 'react'
import { Tabs, Button} from 'flowbite-react'
import toast, { Toaster } from 'react-hot-toast'
import { FcViewDetails } from "react-icons/fc";
import { MdContentPasteGo } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";
import { RxComponent1 } from "react-icons/rx";
import { router, usePage } from '@inertiajs/react';
import Sections from './Sections';
import ContentData from '../../../components/Field/Content/ContentData';
import DesignData from '../../../components/Field/Design/DesignData';
import { DataContext } from '@/Context/DataContext';
import { SectionContext } from '@/Context/SectionContext';

const Items = () => {
    const {handleAddField} = useContext(DataContext)
    const {handleAdd} = useContext(SectionContext)
    const {page} = usePage().props;
  return (
    <>
      <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Pages" icon={MdContentPasteGo}>
                    <div className="my-3 flex justify-end">
                        <Button onClick={handleAdd}> Add Section </Button>
                    </div>
                    <Sections />
                </Tabs.Item>
                <Tabs.Item active title="Content" icon={RxComponent1}>
                  {/* content  */}
                  <div className="m-3 flex justify-end">
                      <Button onClick={() => handleAddField("content", 'Page', page.id)}> Add Field </Button>
                  </div>
                  <ContentData />
                </Tabs.Item>
                <Tabs.Item active title="Design" icon={SiAltiumdesigner}>
                  {/* design  */}
                  <div className="m-3 flex justify-end">
                      <Button onClick={() => handleAddField("design", 'Page', page.id)}> Add Field </Button>
                  </div>
                  <DesignData />
                </Tabs.Item>
                <Tabs.Item active title="Details" icon={FcViewDetails}>
                </Tabs.Item>
            </Tabs>
        </div>
    </>
  )
}

export default Items
