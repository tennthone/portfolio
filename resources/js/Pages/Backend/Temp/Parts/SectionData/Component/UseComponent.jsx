import { SectionDataContext } from "@/Context/SectionDataContext";
import MyModal from "@/Pages/Backend/components/MyModal";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Label, Select } from "flowbite-react";
import { usePage } from "@inertiajs/react";

const UseComponent = () => {
    const { openUseComponent, setOpenUseComponent, data, setData, reset, errors, setErrors } =
        useContext(SectionDataContext);
    return (
        <MyModal
            children={
                <BodyContent data={data} setData={setData} errors={errors} />
            }
            openModal={openUseComponent}
            setOpenModal={setOpenUseComponent}
            routeName="admin.template.section.data.store"
            heading="Set Up Component Design"
            data={data}
            reset={reset}
            setErrors={setErrors}
            processingLabel="Saving"
            buttonName="Use"
        />
    );
};

const BodyContent = ({data, setData, errors}) => {
    const {components} = usePage().props;
    const [componentDesigns, setComponentDesigns] = useState([]);

    const handleChange = (e) => {
        const filterdResult = components.filter(item => item.id == e.target.value);
        setComponentDesigns(filterdResult[0].designs)
    }
    return (
        <>
            <div className="space-y-6">
                {/* components */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="components" value="Component ရွေးရန်" />
                    </div>
                    <Select 
                        onChange={handleChange}
                    >
                        <option value=""> Component ရွေးချယ်ပေးပါရန် </option>
                        {
                            components.length > 0 && components.map(item => (
                                <option value={item.id} key={item.id}> {item.name} </option>
                            ))
                        }
                    </Select>
                </div>
                {/* component design  */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="components" value="Component Design ရွေးရန်" />
                    </div>
                    <Select
                        value={data.design_id}
                        onChange={e => setData('design_id', e.target.value)}
                    >
                        <option value=""> Component Design ရွေးချယ်ပေးပါရန် </option>
                        {
                            componentDesigns.length > 0 && componentDesigns.map(item => (
                                <option value={item.id} key={item.id}> {item.name} </option>
                            ))
                        }
                        <div className="my-3">
                        {
                            errors && errors.design_id && 
                            <div className="text-red-700 text-center"> {errors.design_id} </div>
                        }
                    </div>
                    </Select>
                </div>
            </div>
        </>
    );
};

export default UseComponent;
