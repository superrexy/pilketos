import React, { useState, useRef } from "react";
import AdminDashboard from "../../../../layouts/AdminDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Label from "../../../../components/Label";
import Input from "../../../../components/Input";
import Select from "react-select";

export default function Index(props) {
    const { users, roles } = props;

    return (
        <>
            <Link
                as="button"
                href={route("admin.assign.users.create")}
                className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Assign new Users Role
            </Link>

            <table className="table w-full mt-6 border divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            #
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            NRP
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Role Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users &&
                        users?.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item.nrp}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item?.roles?.map((item, index) => (
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
                                            "admin.assign.users.edit",
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
    <AdminDashboard children={page} title="Assign Roles to Users" />
);
