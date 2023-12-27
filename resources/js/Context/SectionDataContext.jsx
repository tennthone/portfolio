import { createContext, useState} from "react";
import { usePage, useForm } from "@inertiajs/react";

export const SectionDataContext = createContext(null)

export const SectionDataProvider = ({children}) => {
    const [openFieldModal, setOpenFieldModal] = useState(false);
    const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
    const [field, setField] = useState({})

    const handleFieldSelect = (item) => {
        setField(item)
        setOpenFieldModal(false)
        setOpenCreateFieldModal(true)
    }

    return (
        <SectionDataContext.Provider value={{
            openFieldModal,
            setOpenFieldModal,
            openCreateFieldModal,
            setOpenCreateFieldModal,
            handleFieldSelect,
            field
        }}>
            {children}
        </SectionDataContext.Provider>
    )
}