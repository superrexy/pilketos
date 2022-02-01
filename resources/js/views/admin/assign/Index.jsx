import React, { useState, useRef } from "react";
import AdminDashboard from "../../../layouts/AdminDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";

export default function Index(props) {
    const { roles } = props;

    return (
        <>
            <table className="table w-full mt-6 border divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            #
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Role Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                            Guard Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Permissions
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {roles &&
                        roles?.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <div className="inline-flex px-2 text-xs font-semibold leading-6 text-green-800 bg-green-100 rounded-full">
                                        {item.guard_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item?.permissions?.map((item, index) => (
                                        <ul
                                            key={index}
                                            className="list-disc list-outside"
                                        >
                                            <li>{item.name}</li>
                                        </ul>
                                    ))}
                                </td>
                                <td className="px-6 py-4 space-x-3 text-left whitespace-nowrap">
                                    <Link
                                        href={route(
                                            "admin.assign.edit",
                                            item.id
                                        )}
                                        className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
                                    >
                                        Assign
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

Index.layout = (page) => (
    <AdminDashboard children={page} title="Assign Permissions to Roles" />
);
