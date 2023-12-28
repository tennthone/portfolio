import { router } from "@inertiajs/react";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const PermissionContext = createContext(null);

export const PermissionProvider = ({children}) => {
    const [openEditModal, setOpenEditModal] = useState(false)

    const handleEdit = (id) => {
        // do something 
        router.get(route('admin.permission.index'), {edit : id} , {
            onSuccess : () => {
                setOpenEditModal(true)
            },
            onError : () => {
                
            }
        });
    }

    const updatePermission = (roleId, permissionId) => {
        router.put(route('admin.permission.update', roleId), {permission_id : permissionId}, {
            onSuccess : () => {
                toast.success("Permission updated successfully");
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }

    return (
        <PermissionContext.Provider value={{
            handleEdit,
            openEditModal,
            setOpenEditModal,
            updatePermission,
        }}>
            {children}
        </PermissionContext.Provider>
    )
}