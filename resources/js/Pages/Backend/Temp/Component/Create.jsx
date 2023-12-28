import React from "react";
import MyModal from "../../components/MyModal";
import { useContext } from "react";
import { ComponentContext } from "@/Context/ComponentContext";
import { useState } from "react";
import { FloatingLabel, Label, Radio } from "flowbite-react";

const Create = () => {
    const { openCreateModal, setOpenCreateModal, data, setData } =
        useContext(ComponentContext);
    const [errors, setErrors] = useState([]);
    return (
        <div>
            <MyModal
                children={
                    <BodyContent
                        errors={errors}
                        data={data}
                        setData={setData}
                    />
                }
                openModal={openCreateModal}
                setOpenModal={setOpenCreateModal}
                routeName="admin.template.component.store"
                heading="Component"
                name="component"
                data={data}
                setErrors={setErrors}
            />
        </div>
    );
};

export default Create;

const BodyContent = ({ data, setData, errors }) => {
    console.log(data)
    return (
        <div className="space-y-6">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Component အမည်ထည့်ပါ" />
                </div>
                <FloatingLabel
                    label="component name"
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors && errors.name && (
                    <div className="my-3 text-red-700 font-bold text-sm">
                        {errors.name}
                    </div>
                )}
            </div>
            {/* variable name  */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Template တွင်အသုံးပြုမည့် အမည်ထည့်ပါ" />
                </div>
                <FloatingLabel
                    label="variable name"
                    variant="outlined"
                    value={data.value}
                    onChange={(e) => setData("value", e.target.value)}
                />
                {errors && errors.value && (
                    <div className="my-3 text-red-700 font-bold text-sm">
                        {errors.value}
                    </div>
                )}
            </div>
            {/* loopable  */}
            <div>
                <div className="flex items-start gap-2 me-3">
                    <Radio
                        checked={data.isLoopable}
                        onChange={(e) => setData("isLoopable", e.target.checked)}
                    />
                    <Label htmlFor="options"> Loop ပတ်နိုင်သော component ဖြစ်သည်။ </Label>
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Loop ပတ်နိုင်သော အရေအတွက်" />
                </div>
                <FloatingLabel
                    type="number"
                    label="No of Loop"
                    variant="outlined"
                    value={data.maxNoLoop}
                    onChange={(e) => setData("maxNoLoop", e.target.value)}
                />
            </div>
        </div>
    );
};
