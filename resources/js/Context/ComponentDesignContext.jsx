import { createContext, useState} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";

export const ComponentDesignContext = createContext(null)

export const ComponentDesignProvider = ({children}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const {cpt} = usePage().props;
    
    const {data, setData, reset} = useForm(null)

    const handleEdit = (id) => {
        //
    }

    const handleSaveFile = (content, path) => {
        setLoading(true)
        router.post(route('admin.template.filedata.store'), 
        {
            content : content,
            base_path : path
        }, {
        onSuccess : () => {
            setLoading(false)
            toast.success("Content Updated Successfully");
        },
        onError : (err) => {
            console.log(err)
        }
        });
    }

    const handleCreate = () => {
        const initData = {
            name : "",
            value : '',
            component_id : cpt.id,
        }
        setData(initData)
        setOpenCreateModal(true)
    }

    return (
        <ComponentDesignContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            openCreateModal,
            setOpenCreateModal,
            handleEdit,
            handleCreate,
            handleSaveFile,
            loading,
            setLoading,
            data,
            setData,
            reset,
            setErrors,
            errors,
        }}>
            {children}
        </ComponentDesignContext.Provider>
    )
}