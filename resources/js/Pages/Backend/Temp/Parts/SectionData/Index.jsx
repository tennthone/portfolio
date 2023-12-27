import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Breadcrumb, Button } from "flowbite-react";
import { GrTemplate } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { TbTemplate } from "react-icons/tb";
import { Link } from "@inertiajs/react";
import { BsClipboard2Data } from "react-icons/bs";
import Items from "./Items";
import { SectionDataProvider } from "@/Context/SectionDataContext";

const Index = ({page_id, template_id, section_id, contents, designs}) => {
    return (
        <div>
            <Toaster position="top-center" />
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item icon={GrTemplate}>
                            <Link
                                href={route("admin.template.resource.content")}
                            >
                                Templates
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item icon={RiPagesLine}>
                            <Link
                                href={route("admin.template.page", {
                                    template_id: template_id,
                                })}
                            >
                                Pages
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item icon={TbTemplate}>
                            <Link href={route('admin.template.section', {
                                page_id : page_id
                            })}> Sections </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item icon={BsClipboard2Data}>
                            <Link href={route('admin.template.section', page_id)}> Sections Data </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button onClick={() => console.log("add something")}> Add Section </Button>
                </div>
            </div>

            {/* Items to show  */}
            <Items />
        </div>
    );
};

Index.layout = (page) => 
<SectionDataProvider>
    <FrontendLayout children={page} />;
</SectionDataProvider>
export default Index;
