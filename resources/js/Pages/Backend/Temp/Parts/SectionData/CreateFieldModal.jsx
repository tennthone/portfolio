import MyModal from "@/Pages/Backend/components/MyModal";
import { useForm, usePage } from "@inertiajs/react";
import React, { useContext, useEffect } from "react";
import { Label, FloatingLabel, Radio } from "flowbite-react";
import { SectionDataContext } from "@/Context/SectionDataContext";

const CreateFieldModal = () => {
    const {
        openCreateFieldModal,
        setOpenCreateFieldModal,
        field,
        setOpenFieldModal,
    } = useContext(SectionDataContext);

    const {section_id} = usePage().props;
    const { data, setData, reset } = useForm({
        name: "",
        value: "",
        type: "",
        option: "",
        data_type: "",
        section_id : section_id,
    });

    useEffect(() => {
        setData('type', field.type);
    }, [field])

    console.log(data)
    const changeFieldType = () => {
        setOpenCreateFieldModal(false);
        setOpenFieldModal(true);
    };

    return (
        <div>
            <MyModal
                children={
                    <BodyContent 
                        data={data} 
                        setData={setData} 
                        field={field} 
                        changeFieldType={changeFieldType}
                    />
                }
                openModal={openCreateFieldModal}
                setOpenModal={setOpenCreateFieldModal}
                routeName="admin.template.section.content.store"
                name="Field"
                heading="Add New Field"
                data={data}
                reset={reset}
            />
        </div>
    );
};

export default CreateFieldModal;

export const BodyContent = ({ data, setData, field, changeFieldType}) => {
    return (
        <div className="space-y-6">
            {/* field name  */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Add Name" />
                </div>
                <FloatingLabel
                    variant="outlined"
                    label="name"
                    value={data.name}
                    onChange={(event) => setData("name", event.target.value)}
                />
            </div>
            {/* variable  */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="variable" value="Add Variable Name" />
                </div>
                <FloatingLabel
                    variant="outlined"
                    label="variable"
                    value={data.value}
                    onChange={(event) => setData("value", event.target.value)}
                />
            </div>
            {field.type == "file" && (
                <>
                    <div className="flex">
                        <div className="flex items-center gap-2 me-3">
                            <Radio
                                id="options"
                                name="options"
                                value="one"
                                defaultChecked
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <Label htmlFor="options"> One </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="options"
                                name="options"
                                value="many"
                                defaultvalue
                                onChange={(e) =>
                                    setData("option", e.target.value)
                                }
                            />
                            <Label htmlFor="options"> Many </Label>
                        </div>
                    </div>
                </>
            )}

            {/* Change Field Type  */}
            <button
                className="text-indigo-700"
                onClick={() => changeFieldType()}
                type="button"
            >
                Change Field Type
            </button>
        </div>
    );
};
