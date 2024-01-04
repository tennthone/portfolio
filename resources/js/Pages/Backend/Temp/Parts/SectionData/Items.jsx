import React, { useContext } from "react";
import { Button, Tabs } from "flowbite-react";
import { MdContentPasteGo } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";
import { RxComponent1 } from "react-icons/rx";
import ContentData from "./Content/ContentData";
import DesignData from "./Design/DesignData";
import { DataContext } from "@/Context/DataContext";
import { usePage } from "@inertiajs/react";
import { SectionDataContext } from "@/Context/SectionDataContext";
import Component from "./Component/Component";

const Items = () => {
    const { handleAddField } = useContext(DataContext);
    const {handleUseComponent} = useContext(SectionDataContext);
    const { section } = usePage().props;

    return (
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Content" icon={MdContentPasteGo}>
                    <div className="m-3 flex justify-end">
                        <Button
                            onClick={() =>
                                handleAddField("content", "Section", section.id)
                            }
                            size="sm"
                            color="purple"
                        >
                            Add Field
                        </Button>
                    </div>
                    <ContentData />
                </Tabs.Item>
                <Tabs.Item title="Design" icon={SiAltiumdesigner}>
                    <div className="m-3 flex justify-end">
                        <Button
                            onClick={() =>
                                handleAddField("design", "Section", section.id)
                            }
                            size="sm"
                            color="purple"
                        >
                            Add Field
                        </Button>
                    </div>
                    <DesignData />
                </Tabs.Item>
                <Tabs.Item title="Components" icon={RxComponent1}>
                    <div className="m-3 flex justify-end">
                        <Button
                            onClick={() =>
                                handleUseComponent(true)
                            }
                            size="sm"
                            color="purple"
                        >
                            Use Component
                        </Button>
                    </div>
                    <Component />
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default Items;
