import { Fragment, useState } from "react";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { HiOutlineHome, HiUserGroup, HiInbox} from "react-icons/hi";
import { HiXMark, HiMiniBars3 } from "react-icons/hi2";
import { IoLogoGithub} from "react-icons/io";
import { PiGearSixThin } from "react-icons/pi";
import { GrTemplate, GrGallery} from "react-icons/gr";
import Footer from "./Parts/Footer";
import { FaBoxOpen, FaGlobe } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import { TfiSettings } from "react-icons/tfi";
import { useEffect } from "react";
import SideNavbar from "./Parts/SideNavbar";

const intitalNavigation = [
    {
      id : 1,
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: HiOutlineHome,
      permission: "create template",
    },
    {
      id : 2,
      name: "Template",
      href: "/admin/template",
      icon: GrTemplate,
      permission: "create template",
      subNavOpen : false,
      sub_navbars : [
        {
          id : 1,
          name: "Components",
          href: "/admin/template/component",
          icon: FaBoxOpen,
          permission: "create template",
        },
        {
          id : 2,
          name: "Resource",
          href: "/admin/template/resource",
          icon: HiInbox,
          permission: "create template",
        },
        {
          id : 3,
          name: "Website",
          href: "/admin/template/website",
          icon: FaGlobe,
          permission: "create template",
        },
    ]
    },
    {
      id : 3,
      name: "Admin User",
      href: "/admin/admin-management",
      icon: HiUserGroup,
      permission: "create template",
    },
    {
      id : 4,
      name: "Members",
      href: "/admin/member-management",
      icon: HiUserGroup,
      permission: "create template",
    },
    {
      id : 5,
      name: "Github Repository",
      href: "/admin/git-repos",
      icon: IoLogoGithub,
      permission: "create template",
    },
    {
      id : 6,
      name: "Media Library",
      href: "/admin/media-library",
      icon: GrGallery,
      permission: "create template",
    },
    {
      id : 7,
      name: "Setting",
      href: "/admin/setting",
      icon: PiGearSixThin,
      permission: "create template",
      subNavOpen : false,
      sub_navbars : [
        {
          name: "Permissions",
          href: "/admin/setting/permission",
          icon: MdVerifiedUser,
          permission: "create template",
        },
        {
          name: "General Setting",
          href: "/admin/setting/general-setting",
          icon: TfiSettings,
          permission: "create template",
        },
      ]
    },
];

export default function FrontendLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [navigation, setNavigation] = useState(intitalNavigation);
    const { url} = usePage();

    const handleSubNavbar = (id) => {
      setNavigation(prevNavigation => 
        prevNavigation.map(item => {
          if (item.id === id) {
            return { ...item, subNavOpen: !item.subNavOpen };
          }
          return {...item, subNavOpen : false};
        })
      );
    }

    useEffect(() => {
      const updateNavigation = () => {
        const updatedNavigation = navigation.map(item => {
          const shouldBeOpen = url.startsWith(item.href);
          return { ...item, subNavOpen: shouldBeOpen };
        });
        setNavigation(updatedNavigation);
      };
  
      // Call the function initially and when the url changes
      updateNavigation();
    }, [url])
    
    return (
        <>
            <div>
                {/* Mobile Dashboard */}
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>

                                                <HiXMark
                                                    className="w-6 h-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <SideNavbar 
                                      navigation={navigation}
                                      handleSubNavbar={handleSubNavbar}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <SideNavbar
                      navigation={navigation}
                      handleSubNavbar={handleSubNavbar}
                    />
                </div>

                <div className="lg:pl-72">
                    <div className="block md:hidden">
                        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>

                                <HiMiniBars3
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                    <main className="py-10 min-h-screen">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </div>
        </>
    );
}
