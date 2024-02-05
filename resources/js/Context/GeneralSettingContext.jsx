import Edit from "@/Pages/GeneralSetting/Edit";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react"
import { createContext } from "react"

export const GeneralSettingContext = createContext(null)

export const GeneralSettingProvider = ({children}) => {
    const {url, props} = usePage();
    const gs_detail = props.gs_detail;
    const [openEditModal, setOpenEditModal] = useState(false);

    const {data, setData} = useForm({
        name : gs_detail?.name ?? '',
        value : gs_detail?.value ?? '',
        type : gs_detail?.type ?? '',
        category : gs_detail?.category ?? '',
    });

    const [errors, setErrors] = useState([]);
    const handleEditModal = (id) => {
        router.get(url, {id : id}, {
            onSuccess : () => {
                setOpenEditModal(true)
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <GeneralSettingContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            handleEditModal,
            errors,
            setErrors,
            data,
            setData,
        }}>
            {children}
            <Edit />
        </GeneralSettingContext.Provider>
    )
}