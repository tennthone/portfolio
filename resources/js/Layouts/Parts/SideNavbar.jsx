import { usePage } from "@inertiajs/react";
import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import {Link} from "@inertiajs/react";
import ProfileImage from "../../Assets/Default/default-profile.png";
import { router } from "@inertiajs/core";

const SideNavbar = ({navigation, handleSubNavbar}) => {
    const {url, props} = usePage();
    const {metadata, auth, permissions} = props;
    const handleLogout = () => {
        router.post(route('admin.logout'))
    }
    return (
        <React.Fragment>
            <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5">
                <div className="flex items-center h-16 shrink-0">
                    <img
                        className="w-auto h-8 me-3"
                        src={metadata.logo}
                        alt="Your Company"
                    />
                    <p className="text-white text-2xl font-semibold">
                        {metadata.title}
                    </p>
                </div>

                <nav className="flex flex-col flex-1">
                    <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <React.Fragment>
                                        <li key={item.id}>
                                            {permissions.includes(
                                                item.permission
                                            ) && (
                                                <div className="flex justify-between items-center">
                                                    <Link
                                                        href={item.href}
                                                        className={`
                                                        ${
                                                            url.startsWith(
                                                                item.href &&
                                                                    !item.sub_navbars
                                                            )
                                                                ? "bg-gray-800 text-white"
                                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                                        }
                                                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                                            item.sub_navbars
                                                                ? "w-10/12"
                                                                : "w-full"
                                                        }
                                                        `}
                                                    >
                                                        <item.icon
                                                            className="w-6 h-6 shrink-0"
                                                            aria-hidden="true"
                                                        />

                                                        {item.name}
                                                    </Link>
                                                    {item.sub_navbars && (
                                                        <IoIosArrowDown
                                                            size={20}
                                                            fill="#fff"
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                handleSubNavbar(
                                                                    item.id
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                        <ul className="ms-5">
                                            {item.sub_navbars &&
                                                item.subNavOpen &&
                                                item.sub_navbars.map((item) => (
                                                    <li>
                                                        {permissions.includes(
                                                            item.permission
                                                        ) && (
                                                            <Link
                                                                href={item.href}
                                                                className={`
                                                        ${
                                                            url.startsWith(
                                                                item.href
                                                            )
                                                                ? "bg-gray-800 text-white"
                                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                                        }
                                                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                                        `}
                                                            >
                                                                <item.icon
                                                                    className="w-6 h-6 shrink-0"
                                                                    aria-hidden="true"
                                                                />

                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                        </ul>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </li>

                        <li className="mt-auto">
                            <ul role="list" className="-mx-2 space-y-1">
                                {/* notification  */}
                                <li className="">
                                    {
                                        // permissions.includes("view setting") &&
                                        <Link
                                            href="/admin/logout"
                                            method="post"
                                            className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white
                                        ${
                                            url.startsWith("/admin/setting")
                                                ? "bg-gray-800 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                        }
                                        `}
                                        >
                                            <HiOutlineBell
                                                className="w-6 h-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                            Notification
                                        </Link>
                                    }
                                </li>
                                {/* logout  */}
                                <li className="">
                                    {
                                        // permissions.includes("view setting") &&
                                        <Link
                                            onClick={handleLogout}
                                            className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white
                                        ${
                                            url.startsWith("/admin/setting")
                                                ? "bg-gray-800 text-white"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                        }
                                        `}
                                        >
                                            <IoIosLogOut
                                                className="w-6 h-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                            Logout
                                        </Link>
                                    }
                                </li>
                                {/* seperator  */}
                                <li className="border-t-2">
                                    <div className="flex mt-3">
                                        {auth.admin?.profile_image ? (
                                            <img
                                                src={auth.admin.profile_image}
                                                alt="User Profile Image"
                                                className="me-3"
                                                width={50}
                                                height={50}
                                            />
                                        ) : (
                                            <img
                                                src={ProfileImage}
                                                alt="User Profile Image"
                                                className="me-3"
                                                width={50}
                                                height={50}
                                            />
                                        )}
                                        <div>
                                            <p className="text-slate-300 text-sm">
                                                {auth.admin.name}
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                {auth.admin.email}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default SideNavbar;
