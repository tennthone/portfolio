import { ComponentDesignContext } from "@/Context/ComponentDesignContext";
import MyModal from "@/Pages/Backend/components/MyModal";
import React from "react";
import { useContext } from "react";
import { Label, FloatingLabel } from "flowbite-react";

const Create = () => {
    const {
        data,
        setData,
        errors,
        setErrors,
        openCreateModal,
        setOpenCreateModal,
        reset,
    } = useContext(ComponentDesignContext);
    return (
        <MyModal
            children={
                <BodyContent data={data} setData={setData} errors={errors} />
            }
            data={data}
            setData={setData}
            setErrors={setErrors}
            openModal={openCreateModal}
            setOpenModal={setOpenCreateModal}
            routeName="admin.template.component.design.store"
            reset={reset}
            heading="Create Component Design"
        />
    );
};

export default Create;

const BodyContent = ({ data, setData, errors }) => {
    return (
        <>
            <div className="space-y-6">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Component Design အမည်ထည့်ပါ" />
                    </div>
                    <FloatingLabel
                        label="component design name"
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
                        <Label
                            htmlFor="email"
                            value="Template တွင်အသုံးပြုမည့် အမည်ထည့်ပါ"
                        />
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
            </div>
        </>
    );
};
