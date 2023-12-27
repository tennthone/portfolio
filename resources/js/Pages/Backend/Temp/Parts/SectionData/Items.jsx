import React, { useContext } from 'react'
import { Button, Tabs } from 'flowbite-react';
import { MdContentPasteGo } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";
import { RxComponent1 } from "react-icons/rx";
import ContentData from './Content/ContentData';
import DesignData from './Design/DesignData';
import { DataContext } from '@/Context/DataContext';
import FieldModal from '@/Pages/Backend/components/FieldModal';
import CreateFieldModal from '@/Pages/Backend/components/CreateFieldModal';
import { usePage } from '@inertiajs/react';

const Items = () => {
    const {handleAddField} = useContext(DataContext);
    const {section} = usePage().props;
    
  return (
    <div className='my-5'>
        <Tabs aria-label="Tabs with underline" style="underline">
            <Tabs.Item active title="Content" icon={MdContentPasteGo}>
                <div className="m-3 flex justify-end">
                    <Button onClick={() => handleAddField("content", 'Section', section.id)}> Add Field </Button>
                </div>
                <ContentData />
            </Tabs.Item>
            <Tabs.Item title="Design" icon={SiAltiumdesigner}>
                <div className="m-3 flex justify-end">
                    <Button onClick={() => handleAddField("design", 'Section', section.id)}> Add Field </Button>
                </div>
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
