import { createContext, useState} from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";

export const SectionContext = createContext(null)

export const SectionProvider = ({children}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const {sections, page, template_id} = usePage().props;

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

    const handleAdd = () => {
        router.post(route('admin.template.section.store'), {page_id : page.id ,template_id : template_id}, {
          onSuccess : () => {
              toast.success("Section created successfully");
          },
          onError : () => {

          }
      })
    }

    return (
        <SectionContext.Provider value={{
            openEditModal,
            setOpenEditModal,
            handleEdit,
            data,
            setData,
            reset,
            sectionId,
            handleAdd
        }}>
            {children}
        </SectionContext.Provider>
    )
}