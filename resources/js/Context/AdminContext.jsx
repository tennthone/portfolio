import Create from "@/Pages/Admin/Create";
import Edit from "@/Pages/Admin/Edit";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import headers from '../Data/table/admin.json'

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isSuccess, SetIsSuccess] = useState(false);
    const [colHeaders, setcolHeaders] = useState(headers)
    const {url, props} = usePage();
    const admin = props.admin;

    const initData = {
        name: admin?.name ?? '',
        email: admin?.email ?? '',
        phone: admin?.phone ?? '',
        profile_image: admin?.profile_image ?? '',
        roles : admin?.roles ?? [],
        description : admin?.description ?? '',
        address : admin?.address ?? '',
        gender : admin?.gender ?? '',
        social : admin?.social ?? [],
        current_password : "",
        new_password : "",
        confirm_password : ""
    }

    const initSearchData = {
        search : '',
        name: '',
        email: '',
        role: '',
        status: '',
        createdAt : {
            startDate: '',
            endDate: '',
            startYear: '',
            endYear: '',
            startMonth: '',
            endMonth: '',
        },
        page : 1,
        perPage : 6,
        advancedSearch : false,
        sort : false,
        sortBy : '',
        sortField : '',
    };

    const [searchData, setSearchData] = useState(initSearchData)
    const { data, setData, reset} = useForm([]);
    const [ errors, setErrors ] = useState([]);

    const resetSearchData = () => {
        setSearchData(initSearchData)
        router.get(url, {}, {
            preserveScroll : true,
            preserveState : true,
        });
    }
    // update admin 
    const update = (e) => {
        e.preventDefault();
        router.post(route('admin.admin-management.update', admin.id), data, {
            onSuccess : () => {
                toast.success("Admin updated successfully");
                reset()
            },
            onError : (e) => {
                setErrors(e)
            }
        })
    }

    // update admin password 
    const updatePassword = (e) => {
        e.preventDefault();
        router.post(route('admin.admin-management.change-password', admin.id), {
            'current_password': data.current_password,
            'new_password' : data.new_password,
            'confirm_password' : data.confirm_password,
        }, {
            onSuccess : () => {
                toast.success("Password updated")
                reset()
            },
            onError : (e) => {
                setErrors(e)
            }
        })
    }

    // adding admin to the trash
    const handleSoftDelete = (id) => {
        router.delete(route('admin.admin-management.soft-delete', id), {
            onSuccess : () => {
                toast.success("Admin delete successfully")
                reset()
            },
            onError : (e) => {
                setErrors(e)
            }
        })
    }

    // delete admin 
    const handleDelete = (id) => {
        router.delete(route('admin.admin-management.delete', id), {
            onSuccess : () => {
                SetIsSuccess(true);
                toast.success("Admin permanently deleted successfully")
                reset()
            },
            onError : (e) => {
                setErrors(e)
            }
        })
    }

    // restore admin 
    const handleRestore = (id) => {
        router.post(route('admin.admin-management.restore', id), {
            onSuccess : () => {
                toast.success("Admin restore successfully")
                reset()
            },
            onError : (e) => {
                setErrors(e)
            }
        })
    }

    // ban or unban admin 
    const handleSwitchChange = (state, id) => {
        router.post(
            route("admin.admin-management.change-status", id),
            { isActive: state },
            {
                onSuccess: () => {
                    toast.success("Status changed successfully");
                    reset()
                },
                onError: (err) => {
                    console.log(err);
                },
            }
        );
    };


    // handle roles change 
    const handleRoleChange = (e) => {
        const selectedRoles = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setData("roles", selectedRoles);
    };


    useEffect(() => {
        setData(initData)
    }, [admin])

    return (
        <AdminContext.Provider
            value={{
                openCreateModal,
                openEditModal,
                setOpenCreateModal,
                setOpenEditModal,
                searchData,
                setSearchData,
                data,
                setData,
                errors,
                setErrors,
                reset,
                update,
                updatePassword,
                handleSoftDelete,
                handleDelete,
                handleRestore,
                handleSwitchChange,
                resetSearchData,
                handleRoleChange,
                colHeaders,
                setcolHeaders,
                isSuccess,
            }}
        >
            <Toaster 
                position="top-right"
            />
            {children}
            {/* Create admin  */}
            {openCreateModal && <Create />}
            {/* edit admin  */}
            {openEditModal && <Edit />}
        </AdminContext.Provider>
    );
};
