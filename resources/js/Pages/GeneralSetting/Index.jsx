import FrontendLayout from "@/Layouts/FrontendLayout";
import { Link } from "@inertiajs/react";
import { Breadcrumb, Button } from "flowbite-react";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import GeneralSettings from "./GeneralSettings";
import { GeneralSettingProvider } from "@/Context/GeneralSettingContext";

const Index = () => {
    return (
        <React.Fragment>
            <div className="p-3 border-2 rounded-md">
                <div className="flex justify-between">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item icon={MdVerifiedUser}>
                            <Link href={route("admin.general-setting.index")}>
                                GeneralSetting
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button
                        size="sm"
                        color="purple"
                        type="button"
                    >
                        Create Entity
                    </Button>
                </div>
            </div>

            {/* Items Tables */}
            <GeneralSettings />
        </React.Fragment>
    );
};

Index.layout = (page) => 
<GeneralSettingProvider>
  <FrontendLayout children={page} />;
</GeneralSettingProvider>
export default Index;
