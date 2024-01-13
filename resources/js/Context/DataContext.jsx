import { createContext, useState} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import FieldModal from "@/Pages/Backend/components/Field/FieldModal";
import CreateFieldModal from "@/Pages/Backend/components/Field/CreateFieldModal";
import EditFieldModal from "@/Pages/Backend/components/Field/EditFieldModal";
import { useEffect } from "react";
import useLoading from "@/Hooks/useLoading";

export const DataContext = createContext(null)

export const DataProvider = ({children}) => {
    const [openFieldModal, setOpenFieldModal] = useState(false);
    const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
    const [openEditFieldModal, setOpenEditFieldModal] = useState(false);
    const [errors, setErrors] = useState(false);
    const {field} = usePage().props;
    const { data, setData, reset} = useForm(null);
    const [showAlert, setShowAlert] = useState(true);
    const {url} = usePage();
    const {loading, setLoading, LoadingIndicator} = useLoading();

    const changeFieldType = () => {
        setOpenCreateFieldModal(false);
        setOpenFieldModal(true);
        setShowAlert(true)
    };

    const handleAddField = (param, model_name, model_id) => {
        const initData = {
            name: "",
            value: "",
            type: "",
            option: "",
            data_type : param,
            model_name : model_name,
            model_id : model_id
        }
        setData(initData)
        setOpenFieldModal(true)
    }

    const handleFieldSelect = (item) => {
        setData('type', item.type)
        setOpenFieldModal(false)
        setOpenCreateFieldModal(true)
    }

    const  fetchFieldData = (field_id) => {
        setLoading(true);
        router.get(url, {field_id : field_id}, {
            preserveState : true,
            onSuccess : () => {
                setOpenEditFieldModal(true)
                setLoading(false)
            },
            onError : () => {
                //
            }
        });
    }

    const handleEditField = (id) => {
        fetchFieldData(id)
    }


    function store(e) {
        e.preventDefault();
        setLoading(true);
        router.post(route("admin.data.store"), data, {
            onSuccess: () => {
                setLoading(false);
                setOpenCreateFieldModal(false);
                toast.success("Field created successfully");
                reset();
            },
            onError: (err) => {
                setLoading(false);
                setErrors(err);
            },
        });
    }

    function update(e) {
        e.preventDefault();
        router.post(route('admin.data.update', field.id), data, {
            onSuccess : () => {
                setOpenEditFieldModal(false);
                toast.success("Field Updated Successfully")
            }
        })
    }

    function setEditData() {
        setData({
            name: field?.name,
            value: field?.value,
            type: field?.type,
            option: field?.option,
            validation : field && field.validation && JSON.parse(field.validation),
            default_value : field?.default_value,
            apperance : field && field.apperance && JSON.parse(field.apperance),
        })
    }

    useEffect(() => {
        setEditData();
    }, [field])
    

    return (
        <DataContext.Provider value={{
            openFieldModal,
            setOpenFieldModal,
            openCreateFieldModal,
            setOpenCreateFieldModal,
            openEditFieldModal,
            setOpenEditFieldModal,
            handleFieldSelect,
            handleAddField,
            changeFieldType,
            handleEditField,
            store,
            update,
            setData,
            loading,
            showAlert,
            data,
            errors,
        }}>
            {children}
            {LoadingIndicator}
            {openFieldModal && <FieldModal />}
            {openCreateFieldModal && <CreateFieldModal />}
            {openEditFieldModal && <EditFieldModal />}
        </DataContext.Provider>
    )
}