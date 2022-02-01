import React, { useState, useRef } from "react";
import AdminDashboard from "../../../layouts/AdminDashboard";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import { Link, useForm } from "@inertiajs/inertia-react";

export default function Index(props) {
    const { permissions } = props;
    const { data, setData, post, put, errors, reset } = useForm({
        name: "",
        guard_name: "web",
    });

    const handleStore = (e) => {
        e.preventDefault();
        post(route("admin.permissions.store"), {
            data,
            onSuccess: () => {
                reset(), setTambahModal(false);
            },
        });
    };

    const handleEdit = (item) => {
        reset();
        setEditModal(true);
        setData(item);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("admin.permissions.update", data), {
            data,
            onSuccess: () => {
                reset(), setEditModal(false);
            },
        });
    };

    // Tambah Modal
    const [tambahModal, setTambahModal] = useState(false);
    const tambahButtonRef = useRef(null);

    // Edit Modal
    const [editModal, setEditModal] = useState(false);
    const editButtonRef = useRef(null);

    return (
        <>
            <Button
                onClick={() => {
                    setTambahModal(true), reset();
                }}
            >
                Create new Permission
            </Button>

            <Modal
                targetRef={tambahButtonRef}
                title={"Create new Permission"}
                openState={tambahModal}
                closeState={setTambahModal}
            >
                <form className="px-3 py-2" onSubmit={handleStore}>
                    <div className="mb-3">
                        <Label inputFor="name">Permission Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="admin"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                        />
                    </div>
                    <div className="mb-3">
                        <Label inputFor="guard_name">Guard Name</Label>
                        <Input
                            id="guard_name"
                            name="guard_name"
                            placeholder="Default to 'web'"
                            onChange={(e) =>
                                setData("guard_name", e.target.value)
                            }
                            value={data.guard_name}
                        />
                    </div>
                    <div className="grid w-full grid-cols-12 gap-x-3">
                        <Button
                            onClick={() => setTambahModal(false)}
                            ref={tambahButtonRef}
                            className="col-span-6 text-white bg-yellow-500 hover:bg-yellow-600"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            ref={tambahButtonRef}
                            className="col-span-6 text-white bg-green-500 hover:bg-green-600"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                targetRef={editButtonRef}
                title={`Update Permission ${data.name ?? ""}`}
                openState={editModal}
                closeState={setEditModal}
            >
                <form className="px-3 py-2" onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <Label inputFor="name">Permission Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="admin"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                        />
                    </div>
                    <div className="mb-3">
                        <Label inputFor="guard_name">Guard Name</Label>
                        <Input
                            id="guard_name"
                            name="guard_name"
                            placeholder="Default to 'web'"
                            onChange={(e) =>
                                setData("guard_name", e.target.value)
                            }
                            value={data.guard_name}
                        />
                    </div>
                    <div className="grid w-full grid-cols-12 gap-x-3">
                        <Button
                            onClick={() => setEditModal(false)}
                            ref={editButtonRef}
                            className="col-span-6 text-white bg-yellow-500 hover:bg-yellow-600"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            ref={editButtonRef}
                            className="col-span-6 text-white bg-green-500 hover:bg-green-600"
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </Modal>

            <table className="table w-full mt-6 border divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            #
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Permission Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                            Guard Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {permissions &&
                        permissions?.map((item, index) => (
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
                                <td className="px-6 py-4 space-x-3 text-center whitespace-nowrap">
                                    <button
                                        onClick={() => {
                                            handleEdit(item);
                                        }}
                                        className="text-sm font-semibold text-yellow-500 hover:text-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <Link
                                        className="text-sm font-semibold text-red-500 hover:text-red-600"
                                        as="button"
                                        method="DELETE"
                                        href={route(
                                            "admin.permissions.destroy",
                                            item.id
                                        )}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

Index.layout = (page) => <AdminDashboard children={page} title="Permissions" />;
