import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Breadcrumb} from "flowbite-react";
import { Link } from "@inertiajs/react";
import { LuLayoutTemplate } from "react-icons/lu";
import { DataProvider } from "@/Context/DataContext";
import Items from "./Items";
import { ComponentDesignProvider } from "@/Context/ComponentDesignContext";
import Create from "./Create";

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

            {/* Create Modal  */}
            <Create />
        </div>
    );
};

Index.layout = (page) => 
<DataProvider>
    <ComponentDesignProvider>
        <FrontendLayout children={page} />;
    </ComponentDesignProvider>
</DataProvider>
export default Index;
