import React, { useContext } from 'react'
import { Button, Tabs } from 'flowbite-react';
import { MdContentPasteGo } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";
import { RxComponent1 } from "react-icons/rx";
import ContentData from './Content/ContentData';
import DesignData from './Design/DesignData';
import { SectionDataContext } from '@/Context/SectionDataContext';
import FieldModal from './FieldModal';
import CreateFieldModal from './CreateFieldModal';

const Items = () => {
    const {setOpenFieldModal} = useContext(SectionDataContext);
  return (
    <div className='my-5'>
        <Tabs aria-label="Tabs with underline" style="underline">
            <Tabs.Item active title="Content" icon={MdContentPasteGo}>
                <div className="m-3 flex justify-end">
                    <Button onClick={() => setOpenFieldModal(true)}> Add Field </Button>
                </div>
                <ContentData />
            </Tabs.Item>
            <Tabs.Item title="Design" icon={SiAltiumdesigner}>
                <DesignData />
            </Tabs.Item>
            <Tabs.Item title="Components" icon={RxComponent1}>
                This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
            </Tabs.Item>
        </Tabs>
        {/* Field Moadal  */}
        <FieldModal />

        {/* Create Field Modal  */}
        <CreateFieldModal />
    </div>
  )
}

export default Items
