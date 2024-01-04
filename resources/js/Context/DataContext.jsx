import { createContext, useState} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import FieldModal from "@/Pages/Backend/components/FieldModal";
import CreateFieldModal from "@/Pages/Backend/components/CreateFieldModal";
import EditFieldModal from "@/Pages/Backend/components/EditFieldModal";

export const DataContext = createContext(null)

export const DataProvider = ({children}) => {
    const [openFieldModal, setOpenFieldModal] = useState(false);
    const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
    const [openEditFieldModal, setOpenEditFieldModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const {template} = usePage().props;

    const { data, setData, reset, transform} = useForm({
        name: "",
        value: "",
        type: "",
        option: "",
        data_type: "",
        model_name : "",
        model_id: "",
    });

    function submit(e) {
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
    const [showAlert, setShowAlert] = useState(true);

    const changeFieldType = () => {
        setOpenCreateFieldModal(false);
        setOpenFieldModal(true);
        setShowAlert(true)
    };

    const handleAddField = (param, model_name, model_id) => {
        setData({
            data_type : param,
            model_name : model_name,
            model_id : model_id
        })
        setOpenFieldModal(true)
    }

    const handleFieldSelect = (item) => {
        setData('type', item.type)
        setOpenFieldModal(false)
        setOpenCreateFieldModal(true)
    }

    const  fetchFieldData = (field_id) => {
        router.get(route('admin.template.page', {
            template_id : template.id, 
            field_id : field_id
        }), {}, {
            onSuccess : () => {
                setOpenEditFieldModal(true)
            },
            onError : () => {
                //
            }
        });
    }

    const handleEditField = (id) => {
        fetchFieldData(id)
    }

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
            submit,
            setData,
            loading,
            showAlert,
            data,
            errors,
        }}>
            {children}
            <FieldModal />
            <CreateFieldModal />
            <EditFieldModal />
        </DataContext.Provider>
    )
}