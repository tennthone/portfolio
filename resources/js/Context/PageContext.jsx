import { createContext, useState} from "react";
import { usePage, useForm } from "@inertiajs/react";

export const PageContext = createContext(null)

export const PageProvider = ({children}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const {pages} = usePage().props;
    const [errors, setErrors] = useState([]);
    const {data, setData, reset} = useForm({
        name : "",
        value : '',
    })

    const [pageId, setPageId] = useState(null)

    const handleEdit = (id) => {
        setOpenEditModal(true)
        setPageId(id);
        const result = pages.filter(item => item.id == id);
        setData({name : result[0].name, value : result[0].value})
    }


    return (
        <PageContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            handleEdit,
            data,
            setData,
            reset,
            pageId,
            setErrors,
            errors,
        }}>
            {children}
        </PageContext.Provider>
    )
}