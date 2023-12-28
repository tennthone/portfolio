import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Breadcrumb, Button } from "flowbite-react";
import { Link } from "@inertiajs/react";
import { LuLayoutTemplate } from "react-icons/lu";
import { DataProvider } from "@/Context/DataContext";
import Items from "./Items";

const Index = ({cpt}) => {
    return (
        <div>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item icon={LuLayoutTemplate}>
                            <Link href={route("admin.template.component.index")}>
                                Components
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {cpt.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            {/* Items  */}
            <Items />
        </div>
    );
};

Index.layout = (page) => 
<DataProvider>
    <FrontendLayout children={page} />;
</DataProvider>
export default Index;
