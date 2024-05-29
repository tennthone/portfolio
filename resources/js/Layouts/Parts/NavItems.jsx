import { usePage } from "@inertiajs/react";
import React from "react";
import { Link } from "@inertiajs/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavItems = ({ item, handleSubNavbar }) => {
    const { url, props } = usePage();
    const { permissions } = props;

    return (
        <React.Fragment>
            <li key={item.id}>
                {permissions.includes(item.permission) && (
                    <div className="flex justify-between items-center">
                        {item.sub_navbars ? (
                            <button
                                className="text-gray-400 hover:text-white hover:bg-gray-800
                                            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full"
                                onClick={() => handleSubNavbar(item.id)}
                            >
                                <item.icon
                                    className="w-6 h-6 shrink-0"
                                    aria-hidden="true"
                                />
                                {item.name}
                                {item.subNavOpen ? (
                                    <IoIosArrowUp
                                        size={20}
                                        fill="#fff"
                                        className="cursor-pointer ms-auto"
                                    />
                                ) : (
                                    <IoIosArrowDown
                                        size={20}
                                        fill="#fff"
                                        className="cursor-pointer ms-auto"
                                    />
                                )}
                            </button>
                        ) : (
                            <NavItem 
                                url={url}
                                item={item}
                            />
                        )}
                    </div>
                )}
            </li>
            {/* navitem for sub navbar  */}
            {item.sub_navbars && item.subNavOpen && (
                <ul role="list" className="-mx-2 space-y-1 ms-5">
                    {item.sub_navbars.map((item) => (
                        <li>
                            {permissions.includes(item.permission) && (
                                <NavItem 
                                    item={item}
                                    url={url}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
};

export default NavItems;

const NavItem = ({url, item}) => {
    return (
        <Link
            href={item.href}
            className={`
                ${
                    url.startsWith(item.href)
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                }
                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full
            `}
        >
            <item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />

            {item.name}
        </Link>
    );
};
