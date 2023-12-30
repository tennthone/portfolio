import { ComponentDesignContext, ComponentDesignProvider } from "@/Context/ComponentDesignContext";
import FrontendLayout from "@/Layouts/FrontendLayout";
import React from "react";
import { Breadcrumb } from "flowbite-react";
import { Link, usePage } from "@inertiajs/react";
import { LuLayoutTemplate } from "react-icons/lu";
import ShowTabs from "./ShowTabs";
import { SiAltiumdesigner } from "react-icons/si";
import { LuPaintbrush2 } from "react-icons/lu"

const Show = () => {
    const {cpt, cpt_dsg} = usePage().props;
    return (
        <div>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item icon={LuLayoutTemplate}>
                            <Link
                                href={route("admin.template.component.index")}
                            >
                                Components
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item icon={LuPaintbrush2}>
                            <Link
                                href={route("admin.template.component.design.index", {
                                    cpt_id : cpt.id
                                })}
                            >
                            {cpt.name}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item icon={SiAltiumdesigner}>
                            {cpt_dsg.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            {/* Tabs  */}
            <ShowTabs />
        </div>
    );
};

Show.layout = (page) => (
    <ComponentDesignProvider>
        <FrontendLayout children={page} />
    </ComponentDesignProvider>
);
export default Show;
