import Create from "@/Pages/GeneralSetting/Create";
import Edit from "@/Pages/GeneralSetting/Edit";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react"

export const GeneralSettingContext = createContext(null)

export const GeneralSettingProvider = ({children}) => {
    const {url, props} = usePage();
    const gs_detail = props.gs_detail;
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const initData = {
        name : gs_detail?.name ?? '',
        value : gs_detail?.value ?? '',
        type : gs_detail?.type ?? '',
        category : gs_detail?.category ?? '',
    };

    const {data, setData} = useForm(initData);
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

    useEffect(() => {
        if(gs_detail) setData(initData);
    }, [gs_detail.id])

    return (
        <GeneralSettingContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            handleEditModal,
            openCreateModal,
            setOpenCreateModal,
            errors,
            setErrors,
            data,
            setData,
        }}>
            {children}
            <Edit />
            <Create />
        </GeneralSettingContext.Provider>
    )
}