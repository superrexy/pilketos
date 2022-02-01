import React, { useState, useRef } from "react";
import PemilihanDashboard from "../../layouts/PemilihanDashboard";
import Modal from "../../components/Modal";
import { Link } from '@inertiajs/inertia-react';

export default function Index(props) {
    const { candidates } = props;
    const [detail, setDetail] = useState({ name: "", visi: "", misi: "" });

    const handleDetail = (item) => {
        setDetailModal(true);
        setDetail({
            name: item.name,
            visi: item.visi,
            misi: item.misi,
        });
    };

    const [detailModal, setDetailModal] = useState(false);
    const detailButtonRef = useRef(null);

    return (
        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                    {candidates &&
                        candidates?.map((item) => (
                            <div className="max-w-sm col-span-3" key={item.id}>
                                <div className="border rounded-md shadow-sm">
                                    <div className="p-2 font-medium leading-relaxed tracking-wide text-center text-gray-800">
                                        {item.name}
                                    </div>
                                    <div>
                                        <img
                                            src={`/images/candidates/${item.image}`}
                                            alt={`Foto ${item.name}`}
                                        />
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={() => handleDetail(item)}
                                            className="block w-full px-4 py-2 mb-2 text-sm font-semibold leading-relaxed tracking-wide text-white transition duration-200 bg-blue-500 rounded-sm hover:bg-blue-600 focus:outline-none"
                                        >
                                            Detail Visi & Misi
                                        </button>
                                        <Link href={route('pilketos.vote', item)} as="button" method="post" className="block w-full px-4 py-2 text-sm font-semibold leading-relaxed tracking-wide text-white transition duration-200 bg-green-500 rounded-sm hover:bg-green-600 focus:outline-none">
                                            Vote Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Modal
                targetRef={detailButtonRef}
                title={`${
                    detail.name != ""
                        ? "Kandidat " + detail.name
                        : "Detail Kandidat"
                }`}
                openState={detailModal}
                closeState={setDetailModal}
                size="max-w-lg w-full"
            >
                <div className="p-2 bg-white">
                    <div className="container mx-auto">
                        <h6 className="text-lg font-medium leading-6 text-gray-700">
                            Visi
                        </h6>
                        <p className="mb-3 leading-relaxed tracking-tight text-gray-600">
                            {detail.visi}
                        </p>
                        <h6 className="text-lg font-medium leading-6 text-gray-700">
                            Misi
                        </h6>
                        <p className="leading-relaxed tracking-tight text-gray-600">
                            {detail.misi}
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                        ref={detailButtonRef}
                        onClick={() => setDetailModal(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

Index.layout = (page) => <PemilihanDashboard children={page} />;
