import { useState, useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AdminDashboard from "../../../layouts/AdminDashboard";
import Modal from "../../../components/Modal";

export default function Index(props) {
    const { candidates } = props;
    const { data, setData, post, put, errors, reset } = useForm({
        name: "",
        visi: "",
        misi: "",
        image: "",
    });
    // Modal Tambah Kandidat
    const [modalOpenTambah, setModalOpenTambah] = useState(false);
    let tambahButtonRef = useRef(null);

    // Modal Detail Kandidat
    const [modalDetail, setModalDetail] = useState(false);
    let detailButtonRef = useRef(null);

    // Modal Edit Kandidat
    const [modalEdit, setModalEdit] = useState(false);
    let editButtonRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.kandidat.index"), {
            data,
            onSuccess: () => {
                setModalOpenTambah(false), reset();
            },
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        put(route("admin.kandidat.update", data), {
            data,
            onSuccess: () => {
                setModalEdit(false), reset();
            },
        });
    };

    const [detailCandidate, setDetailCandidate] = useState({
        id: "",
        name: "",
        visi: "",
        misi: "",
        image: "",
    });

    const handleDetail = (item) => {
        setModalDetail(true);
        setDetailCandidate({
            id: item.id,
            name: item.name,
            visi: item.visi,
            misi: item.misi,
            image: item.image,
        });
    };

    const handleEdit = (item) => {
        setModalEdit(true);
        setData({
            id: item.id,
            name: item.name,
            visi: item.visi,
            misi: item.misi,
            image: item.image,
        });
    };

    const handleDelete = (id) => {
        Inertia.delete(route("admin.kandidat.destroy", id));
    };

    return (
        <>
            <button
                className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={() => setModalOpenTambah(true)}
            >
                Tambah Kandidat Baru
            </button>

            <table className="w-full mt-5 border">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="p-1 font-semibold leading-relaxed tracking-wide text-gray-900">
                            #
                        </th>
                        <th className="p-1 font-semibold leading-relaxed tracking-wide text-gray-900">
                            Nama Kandidat
                        </th>
                        <th className="p-1 font-semibold leading-relaxed tracking-wide text-gray-900">
                            Foto
                        </th>
                        <th className="p-1 font-semibold leading-relaxed tracking-wide text-gray-900">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {candidates?.map((item, index) => (
                        <tr className="bg-white border-b" key={item.id}>
                            <td className="p-1 leading-relaxed tracking-wide text-center">
                                {index + 1}
                            </td>
                            <td className="p-1 leading-relaxed tracking-wide text-center">
                                {item.name}
                            </td>
                            <td className="flex items-center justify-center p-1 leading-relaxed tracking-wide text-center">
                                <img
                                    src={`/images/candidates/${item.image}`}
                                    alt={`Foto ${item.name}`}
                                    className="object-cover w-52 h-52"
                                />
                            </td>
                            <td className="p-1 leading-relaxed tracking-wide text-center">
                                <button
                                    onClick={() => handleDetail(item)}
                                    className="px-2 py-1 text-sm font-medium text-white transition duration-150 bg-green-500 rounded-md hover:bg-green-600"
                                >
                                    Detail
                                </button>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-2 py-1 mx-1 text-sm font-medium text-white transition duration-150 bg-yellow-500 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-2 py-1 text-sm font-medium text-white transition duration-150 bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                targetRef={tambahButtonRef}
                title={"Tambah Kandidat Baru"}
                openState={modalOpenTambah}
                closeState={setModalOpenTambah}
            >
                <div className="p-2 bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="mb-1 text-gray-900"
                            >
                                Name Kandidat
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full p-1 border rounded-md focus:outline-blue-500"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="visi"
                                className="mb-1 text-gray-900"
                            >
                                Visi
                            </label>
                            <textarea
                                name="visi"
                                id="visi"
                                rows="5"
                                className="w-full p-1 border rounded-md resize-none focus:outline-blue-500"
                                value={data.visi}
                                onChange={(e) =>
                                    setData("visi", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="misi"
                                className="mb-1 text-gray-900"
                            >
                                Misi
                            </label>
                            <textarea
                                name="misi"
                                id="misi"
                                rows="5"
                                className="w-full p-1 border rounded-md resize-none focus:outline-blue-500"
                                value={data.misi}
                                onChange={(e) =>
                                    setData("misi", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="image"
                                className="mb-1 text-gray-900"
                            >
                                Foto Kandidat
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="w-full p-1 border rounded-md focus:outline-blue-500"
                            />
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
                            Create
                        </button>
                        <button
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                            onClick={() => setModalOpenTambah(false)}
                            ref={detailButtonRef}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </Modal>

            <Modal
                targetRef={editButtonRef}
                title={"Edit Kandidat"}
                openState={modalEdit}
                closeState={setModalEdit}
            >
                <div className="p-2 bg-white">
                    <form onSubmit={handleSubmitEdit}>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="mb-1 text-gray-900"
                            >
                                Name Kandidat
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full p-1 border rounded-md focus:outline-blue-500"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="visi"
                                className="mb-1 text-gray-900"
                            >
                                Visi
                            </label>
                            <textarea
                                name="visi"
                                id="visi"
                                rows="5"
                                className="w-full p-1 border rounded-md resize-none focus:outline-blue-500"
                                value={data.visi}
                                onChange={(e) =>
                                    setData("visi", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="misi"
                                className="mb-1 text-gray-900"
                            >
                                Misi
                            </label>
                            <textarea
                                name="misi"
                                id="misi"
                                rows="5"
                                className="w-full p-1 border rounded-md resize-none focus:outline-blue-500"
                                value={data.misi}
                                onChange={(e) =>
                                    setData("misi", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="text-gray-900">
                                Foto Kandidat
                            </label>
                            <img
                                src={`/images/candidates/${data.image}`}
                                alt={`Foto ${data.name}`}
                                className="object-cover my-3 w-36 h-36"
                            />
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="w-full p-1 border rounded-md focus:outline-blue-500"
                            />
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
                            Update
                        </button>
                        <button
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                            onClick={() => setModalEdit(false)}
                            ref={editButtonRef}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </Modal>

            <Modal
                targetRef={detailButtonRef}
                title={`${
                    detailCandidate.name != ""
                        ? "Kandidat " + detailCandidate.name
                        : "Detail Kandidat"
                }`}
                openState={modalDetail}
                closeState={setModalDetail}
                size="max-w-2xl w-full"
            >
                <div className="p-2 bg-white">
                    <div className="grid grid-cols-10 my-2">
                        <div className="col-span-4">
                            <img
                                src={`/images/candidates/${detailCandidate.image}`}
                                alt={`Foto ${detailCandidate.name}`}
                                className="object-cover w-64 h-64"
                            />
                        </div>
                        <div className="col-span-6 ml-3">
                            <h3 className="mb-3 text-xl font-medium leading-6 text-blue-500">
                                {detailCandidate.name}
                            </h3>

                            <div className="mb-6">
                                <p className="font-medium text-gray-500">
                                    Visi
                                </p>
                                <span className="leading-relaxed tracking-tight text-gray-800">
                                    {detailCandidate.visi}
                                </span>
                            </div>

                            <div className="mb-6">
                                <p className="font-medium text-gray-500">
                                    Misi
                                </p>
                                <span className="leading-relaxed tracking-tight text-gray-800">
                                    {detailCandidate.misi}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                        ref={detailButtonRef}
                        onClick={() => setModalDetail(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}

Index.layout = (page) => <AdminDashboard children={page} title="Kandidat" />;
