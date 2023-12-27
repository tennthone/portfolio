import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Breadcrumb} from "flowbite-react";
import { GrTemplate } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { TbTemplate } from "react-icons/tb";
import { Link } from "@inertiajs/react";
import { BsClipboard2Data } from "react-icons/bs";
import Items from "./Items";
import { DataProvider } from "@/Context/DataContext";

const Index = ({page_id, template_id, section}) => {
    console.log(template_id)
    return (
        <div>
            <Toaster position="top-center" />
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item icon={GrTemplate}>
                            <Link
                                href={route("admin.template.resource")}
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
                            <Link href="#"> {section.name} </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            {/* Items to show  */}
            <Items />
        </div>
    );
};

Index.layout = (page) => 
<DataProvider>
    <FrontendLayout children={page} />;
</DataProvider>
export default Index;
