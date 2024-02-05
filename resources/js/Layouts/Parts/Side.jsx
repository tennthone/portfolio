import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiUsers } from "react-icons/hi";
import { FaGears, FaMedium } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import "./app.css";
import { FaGlobe } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import toast from "react-hot-toast";
import { IoLogOut } from "react-icons/io5";
import { GrTemplate } from "react-icons/gr";
import { FaBoxOpen } from "react-icons/fa";
import { TfiSettings } from "react-icons/tfi";

const Side = () => {
    const { url } = usePage();
    const { permissions, metadata} = usePage().props;

    const handleLogout = () => {
        router.post(
            route("admin.logout"),
            {},
            {
                onSuccess: () => {
                    toast.success("Logout successfully");
                },
                onError: () => {},
            }
        );
    };
    return (
        <>
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Logo
                    href={route('admin.dashboard')}
                    img={metadata.logo}
                    imgAlt="Tennthone logo"
                >
                    {metadata.title}
                </Sidebar.Logo>
                <Sidebar.Items color="blue">
                    <Sidebar.ItemGroup>
                        <Sidebar.Item icon={HiChartPie}>
                            <Link href={route("admin.dashboard")}>
                                Dashboard
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={GrTemplate} label="Template">
                            <Sidebar.Item icon={FaBoxOpen}>
                                <Link
                                    href={route(
                                        "admin.template.component.index"
                                    )}
                                >
                                    Components
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item icon={HiInbox}>
                                <Link href={route("admin.template.resource")}>
                                    Resource
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item icon={FaGlobe}>
                                <Link href={route("admin.template.website")}>
                                    Website
                                </Link>
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        {/* admins  */}
                        {permissions.includes("view template") && (
                            <Sidebar.Item icon={HiUsers}>
                                <Link href={route("admin.admin-management")}>
                                    Admin Users
                                </Link>
                            </Sidebar.Item>
                        )}
                        {/* users  */}
                        <Sidebar.Item icon={HiUsers}>
                            <Link href={route("admin.member-management")}>
                                Members
                            </Link>
                        </Sidebar.Item>

                        {/* git hub repo  */}
                        <Sidebar.Item href="#" icon={IoLogoGithub}>
                            <Link href={route("admin.gitrepo.index")}>
                                GitHub Repositories
                            </Link>
                        </Sidebar.Item>

                        {/* settings  */}
                        <Sidebar.Collapse icon={FaGears} label="Setting">
                            {/* permissions  */}
                            {permissions.includes("view permission") && (
                                <Sidebar.Item icon={MdVerifiedUser}>
                                    <Link
                                        className={url.startsWith(
                                            "/admin/setting/permission"
                                                ? "active"
                                                : "not-active"
                                        )}
                                        href={route("admin.permission.index")}
                                    >
                                        Permission
                                    </Link>
                                </Sidebar.Item>
                            )}
                            <Sidebar.Item icon={TfiSettings}>
                                <Link
                                    href={route("admin.general-setting.index")}
                                >
                                    General Setting
                                </Link>
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item icon={FaMedium}>
                            Media Library
                        </Sidebar.Item>
                        <Sidebar.Item icon={IoLogOut}>
                            <Link onClick={() => handleLogout()}> Logout </Link>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
};

export default Side;
