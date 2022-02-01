import React, { useState, useRef } from "react";
import AdminDashboard from "../../../../layouts/AdminDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import Label from "../../../../components/Label";
import Input from "../../../../components/Input";
import Select from "react-select";

export default function Create(props) {
    const { roles } = props;

    const roles_select = roles?.map((i) => ({
        value: i.id,
        label: i.name,
    }));

    const { data, setData, post, reset, errors } = useForm({
        nrp: "",
        roles: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.assign.users.create"), {
            data,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <div className="w-2/3 border rounded-lg bg-gray-50">
                <form className="px-4 py-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Label inputFor="nrp">NRP</Label>
                        <Input
                            name="nrp"
                            id="nrp"
                            value={data.nrp}
                            onChange={(e) => setData("nrp", e.target.value)}
                        />
                        {errors.nrp && (
                            <div className="mt-1 text-sm font-medium text-red-500 tracking-6">
                                {errors.nrp}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <Label inputFor="roles">Roles</Label>
                        <Select
                            id="roles"
                            name="roles"
                            isSearchable={false}
                            options={roles_select}
                            isClearable={true}
                            isMulti
                            value={data.roles}
                            onChange={(e) => setData("roles", e)}
                        />
                        {errors.roles && (
                            <div className="mt-1 text-sm font-medium text-red-500 tracking-6">
                                {errors.roles}
                            </div>
                        )}
                    </div>
                    <div className="grid w-full grid-cols-12 gap-x-6">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full col-span-6 px-4 py-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            Create
                        </button>
                        <Link
                            href={route("admin.assign.users.index")}
                            className="inline-flex items-center justify-center w-full col-span-6 px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <AdminDashboard children={page} title="Assign Roles to Users" />
);
