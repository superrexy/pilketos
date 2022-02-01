import React, { useState, useRef } from "react";
import AdminDashboard from "../../../layouts/AdminDashboard";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

export default function Index(props) {
    const { users } = props;
    const [file, setFile] = useState(null);

    const { data, setData, errors, post, reset } = useForm({
        name: "",
        nrp: "",
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.users.store"), {
            data,
            onSuccess: () => {
                setModalOpenTambah(false), reset();
            },
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        post(route("admin.users.import"), {
            data,
            onSuccess: () => {
                setModalOpenUpload(false, reset());
            },
        });
    };

    const handleDelete = (id) => {
        Inertia.delete(route("admin.users.destroy", id));
    };

    // Modal Tambah
    const [modalOpenTambah, setModalOpenTambah] = useState(false);
    let tambahButtonRef = useRef(null);

    // Modal Upload
    const [modalOpenUpload, setModalOpenUpload] = useState(false);
    let uploadButtonRef = useRef(null);

    return (
        <>
            <div className="flex space-x-3">
                <Button onClick={() => setModalOpenTambah(true)}>
                    Create new User
                </Button>
                <Button onClick={() => setModalOpenUpload(true)}>
                    Upload CSV
                </Button>
            </div>

            {/* Modal Tambah Users */}
            <Modal
                targetRef={tambahButtonRef}
                title={"Create new User"}
                openState={modalOpenTambah}
                closeState={setModalOpenTambah}
            >
                <div className="p-2 bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Label inputFor={"name"}>Nama Pemilih</Label>
                            <Input
                                name="name"
                                id="name"
                                placeholder="John Doe"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="mt-1 text-sm font-medium leading-relaxed tracking-tight text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <Label inputFor={"nrp"}>NRP</Label>
                            <Input
                                name="nrp"
                                id="nrp"
                                placeholder="XXXXXXXXXX"
                                type="number"
                                value={data.nrp}
                                onChange={(e) => setData("nrp", e.target.value)}
                            />
                            {errors.nrp && (
                                <div className="mt-1 text-sm font-medium leading-relaxed tracking-tight text-red-500">
                                    {errors.nrp}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
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
                            Create User
                        </button>
                        <button
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                            onClick={() => setModalOpenTambah(false)}
                            ref={tambahButtonRef}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </Modal>
            {/* Modal Tambah Users */}

            {/* Modal Upload CSV */}
            <Modal
                targetRef={uploadButtonRef}
                title={"Create new User"}
                openState={modalOpenUpload}
                closeState={setModalOpenUpload}
            >
                <div className="p-2 bg-white">
                    <form onSubmit={handleUpload}>
                        <div className="mb-3">
                            <Label inputFor={"file"}>Nama Pemilih</Label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="w-full px-4 py-2 text-sm text-gray-500 border file:rounded-full file:border-0 file:px-4 file:py-2 file:bg-blue-500 file:text-white file:text-sm file:font-medium file:mr-5"
                                onChange={(e) =>
                                    setData("file", e.target.files[0])
                                }
                            />
                            {errors.file && (
                                <div className="mt-1 text-sm font-medium leading-relaxed tracking-tight text-red-500">
                                    {errors.file}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
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
                            Upload Users CSV
                        </button>
                        <button
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                            onClick={() => setModalOpenUpload(false)}
                            ref={uploadButtonRef}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </Modal>
            {/* Modal Upload CSV */}

            <table className="table w-full mt-6 border">
                <thead className="divide-y divide-gray-200">
                    <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700">
                            #
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700">
                            Name
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700">
                            NRP
                        </th>
                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users &&
                        users?.data?.map((item, index) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                                    {index + users.from}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item.name}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {item.nrp}
                                </td>
                                <td className="px-4 py-3 space-x-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    <Button className="text-white bg-yellow-500 hover:bg-yellow-600">
                                        Edit
                                    </Button>
                                    <Button
                                        className="text-white bg-red-500 hover:bg-red-600"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="flex items-center justify-center mt-5 space-x-3">
                {users &&
                    users?.links?.map((item, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 border rounded-xl text-sm font-medium ${
                                item.active ? "bg-blue-500 text-white" : ""
                            } ${
                                item.url == null
                                    ? "bg-slate-50 text-slate-500"
                                    : ""
                            }`}
                        >
                            <Link
                                as="button"
                                disabled={item.url == null ? true : false}
                                href={item.url}
                                dangerouslySetInnerHTML={{ __html: item.label }}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AdminDashboard children={page} title="Users Management" />
);
