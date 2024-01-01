import { createContext, useState} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const SectionDataContext = createContext(null)

export const SectionDataProvider = ({children}) => {
    const [openUseComponent, setOpenUseComponent] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const {page_id, template_id, section, flash} = usePage().props;
    const [deleteId, setDeleteId] = useState('');
    const initData = {
        'template_id' : template_id,
        'section_id' : section.id,
        'design_id' : '',
    }
    const {data, setData, reset} = useForm(initData)

    const handleUseComponent = () => {
        setLoading(true)
        router.get(route('admin.template.section.data'), 
        {
            use_component : true,
            page_id : page_id,
            template_id : template_id,
            section_id : section.id
        }, 
        {
            onSuccess : () => {
                setLoading(false)
                setOpenUseComponent(true)
            },
            onError : () => {

            }
        });
    }

    const handleDeleteComponentDesign = () => {
        router.post(route('admin.template.section.component-design.delete', deleteId ),
        {section_id : section.id}, 
        {
            onSuccess : () => {
                setOpenDeleteModal(false)
            },
            onError : () => {

            }
        })
    }

    const handleOpenDeleteModal = (id) => {
        setDeleteId(id)
        setOpenDeleteModal(true);
    }

    useEffect(() => {
        if(flash.success) {
            toast.success(flash.success)
        }
    }, [flash.success])

    return (
        <SectionDataContext.Provider value={{
            openUseComponent,
            setOpenUseComponent,
            handleUseComponent,
            handleDeleteComponentDesign,
            openDeleteModal,
            setOpenDeleteModal,
            handleOpenDeleteModal,
            loading,
            data, 
            setData,
            reset,
            errors, 
            setErrors,
        }}>
            {children}
        </SectionDataContext.Provider>
    )
}