import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { createContext } from "react";

export const ComponentContext = createContext(null)

export const ComponentProvider = ({children}) => {
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const {data, setData, reset} = useForm({
        name : '',
        value : '',
        isLoopable : false,
        maxNoLoop : 0,
    })

    return (
        <ComponentContext.Provider value={{
            openCreateModal,
            setOpenCreateModal,
            data,
            setData,
            reset
        }}>
            {children}
        </ComponentContext.Provider>
    )
}