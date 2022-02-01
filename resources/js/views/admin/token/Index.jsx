import React, { useState, useEffect } from "react";
import AdminDashboard from "../../../layouts/AdminDashboard";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import Label from "../../../components/Label";
import Input from "../../../components/Input";

export default function Index(props) {
    const { generate_token } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nrp: "",
    });
    const [card, setCard] = useState(false);

    useEffect(() => {
        if (generate_token.messages != null) {
            setCard(true);
        }
    }, [generate_token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.token.index"), {
            data,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                setCard(false);
            },
        });
    };

    return (
        <>
            <div className="w-1/3 border rounded-lg bg-gray-50">
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
                    <div className="grid w-full grid-cols-12 gap-x-6">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full col-span-12 px-4 py-2 text-sm font-medium text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
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
                            Generate
                        </button>
                    </div>
                </form>
            </div>
            {card && (
                <div className="w-1/3 mt-5">
                    <div className="px-4 py-3 text-white bg-green-600 rounded shadow">
                        <div className="inline-flex items-center justify-between w-full">
                            <p>{generate_token.messages ?? ""}</p>
                            <button onClick={() => setCard(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = (page) => (
    <AdminDashboard children={page} title="Generate Token User" />
);
