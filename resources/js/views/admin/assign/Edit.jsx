import React, { useState, useRef } from "react";
import AdminDashboard from "../../../layouts/AdminDashboard";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import { Link, useForm } from "@inertiajs/inertia-react";
import Select from "react-select";

export default function Edit(props) {
    const { roles, role, role_permissions, permissions } = props;

    const roles_select = roles?.map((i) => ({
        value: i.id,
        label: i.name,
    }));

    const permissions_select = permissions?.map((i) => ({
        value: i.id,
        label: i.name,
    }));

    const { data, setData, post, put, errors, reset } = useForm({
        role: { value: role.id, label: role.name },
        permissions: role_permissions?.map((i) => ({
            value: i.id,
            label: i.name,
        })),
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("admin.assign.edit", data.role.value), {
            data,
            onSuccess: () => {
                reset(), setEditModal(false);
            },
        });
    };

    return (
        <>
            <div className="w-2/3 border rounded-lg bg-gray-50">
                <form
                    className="flex flex-col h-full px-3 py-2"
                    onSubmit={handleUpdate}
                >
                    <div className="flex-grow w-full">
                        <div className="mb-3">
                            <Label inputFor="name">Role Name</Label>
                            <Select
                                isSearchable={false}
                                options={roles_select}
                                isClearable={true}
                                value={data.role}
                                isDisabled={true}
                                onChange={(e) => setData("role", e)}
                            />
                        </div>
                        <div className="mb-3">
                            <Label inputFor="guard_name">Guard Name</Label>
                            <Select
                                isSearchable={false}
                                options={permissions_select}
                                defaultValue={data.permissions}
                                isClearable={true}
                                isMulti
                                onChange={(e) => setData("permissions", e)}
                            />
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-12 gap-x-3">
                        <Link
                            href={route("admin.assign.index")}
                            className="col-span-6 text-white bg-yellow-500 hover:bg-yellow-600"
                            as="button"
                        >
                            Back
                        </Link>
                        <Button
                            type="submit"
                            className="col-span-6 text-white bg-green-500 hover:bg-green-600"
                        >
                            Assign
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AdminDashboard children={page} title="Assign Permissions to Roles" />
);
