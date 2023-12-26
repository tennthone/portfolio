import { createContext, useState} from "react";
import { usePage, useForm } from "@inertiajs/react";

export const SectionContext = createContext(null)

export const SectionProvider = ({children}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const {sections} = usePage().props;

    const {data, setData, reset} = useForm({
        name : "",
        value : '',
    })

    const [sectionId, setSectionId] = useState(null)

    const handleEdit = (id) => {
        setOpenEditModal(true)
        setSectionId(id);
        const result = sections.filter(item => item.id == id);
        setData({name : result[0].name, value : result[0].value})
    }


    return (
        <SectionContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            handleEdit,
            data,
            setData,
            reset,
            sectionId
        }}>
            {children}
        </SectionContext.Provider>
    )
}