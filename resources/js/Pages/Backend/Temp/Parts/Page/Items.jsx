import toast, { Toaster } from "react-hot-toast";
import { Tabs, Button} from "flowbite-react";
import { FcViewDetails } from "react-icons/fc";
import { MdContentPasteGo } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";
import { RxComponent1 } from "react-icons/rx";
import Pages from "./Pages";
import Details from "./Details";
import { router, usePage } from "@inertiajs/react";
import ContentData from "../SectionData/Content/ContentData";
import DesignData from "../SectionData/Design/DesignData";
import { useContext } from "react";
import { DataContext } from "@/Context/DataContext";

const Items = () => {
    const {template} = usePage().props;
    const {handleAddField} = useContext(DataContext)
    const handleAdd = () => {
      router.post(route('admin.template.page.store'), {template_id : template.id}, {
          onSuccess : () => {
              toast.success("Page created successfully");
          },
          onError : () => {

          }
      })
    }
    
    return (
        <div className="my-5">
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Pages" icon={MdContentPasteGo}>
                    <div className="my-3 flex justify-end">
                        <Button onClick={handleAdd}> Add Page </Button>
                    </div>
                    <Pages />
                </Tabs.Item>
                <Tabs.Item active title="Content" icon={RxComponent1}>
                      {/* content  */}
                    <div className="m-3 flex justify-end">
                        <Button onClick={() => handleAddField("content", 'Template', template.id)}> Add Field </Button>
                    </div>
                    <ContentData />
                </Tabs.Item>
                <Tabs.Item active title="Design" icon={SiAltiumdesigner}>
                      {/* design  */}
                    <div className="m-3 flex justify-end">
                        <Button onClick={() => handleAddField("design", 'Template', template.id)}> Add Field </Button>
                    </div>
                    <DesignData />
                </Tabs.Item>
                <Tabs.Item active title="Details" icon={FcViewDetails}>
                    <Details />
                </Tabs.Item>
            </Tabs>
        </div>
    );
};

export default Items;
