import React, { useEffect } from "react";
import { Link, usePage, Head } from "@inertiajs/inertia-react";
import toast, { Toaster } from "react-hot-toast";
import NavLink from "../components/NavLink";

export default function AdminDashboard(props) {
    const { children, title } = props;
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.status) toast[flash.status](flash.messages);
    }, [flash]);

    return (
        <div className="flex">
            <Head title={`${title ?? "Pilketos"} | Pilketos`} />
            <div className="fixed min-h-screen border-r w-72">
                <Toaster position="bottom-right" reverseOrder={false} />
                <div className="p-2 mt-5 text-center">
                    <Link
                        href={route("admin.index")}
                        className="text-2xl font-medium leading-6 text-blue-500 uppercase"
                    >
                        Pilketos
                    </Link>
                </div>

                <div className="flex flex-col w-full mt-12">
                    <span className="px-5 mb-3 font-semibold text-blue-500 uppercase">
                        <small>MENU</small>
                    </span>

                    <NavLink to="admin.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        Dashboard
                    </NavLink>

                    <NavLink to="admin.kandidat.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Kandidat
                    </NavLink>

                    <span className="px-5 mb-3 font-semibold text-blue-500 uppercase">
                        <small>Token & Users</small>
                    </span>

                    <NavLink to="admin.users.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                        Create Users
                    </NavLink>

                    <NavLink to="admin.token.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                        Generate Token
                    </NavLink>

                    <span className="px-5 mb-3 font-semibold text-blue-500 uppercase">
                        <small>Role & Permission</small>
                    </span>

                    <NavLink to="admin.roles.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        Roles
                    </NavLink>

                    <NavLink to="admin.permissions.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                            />
                        </svg>
                        Permissions
                    </NavLink>

                    <NavLink to="admin.assign.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                        </svg>
                        Assign Role Permissions
                    </NavLink>

                    <NavLink to="admin.assign.users.index">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 w-6 h-6 mr-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                        </svg>
                        Assign Role User
                    </NavLink>

                    <hr className="mb-3" />

                    <NavLink to="auth.logout" method="POST" as="button" replace>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mr-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        Log Out
                    </NavLink>
                </div>
            </div>
            <div className="w-full pb-20 ml-72">
                <div className="container mx-auto">
                    <h1 className="mt-6 text-xl font-medium leading-relaxed tracking-wide text-blue-500 capitalize">
                        {title}
                    </h1>
                    {children}
                </div>
            </div>
        </div>
    );
}
