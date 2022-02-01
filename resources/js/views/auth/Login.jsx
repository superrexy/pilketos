import React, { useEffect } from "react";
import { useForm, usePage, Head } from "@inertiajs/inertia-react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const { flash } = usePage().props;

    const { data, setData, post, errors, reset } = useForm({
        nrp: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("auth.login"), { data, onSuccess: () => reset() });
    };

    useEffect(() => {
        if (flash.status) toast[flash.status](flash.messages);
    }, [flash]);

    return (
        <div className="flex items-center justify-center h-screen max-h-screen">
            <Head title="Pilketos" />
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="relative w-full blur-sm">
                <img
                    src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=2000&q=100"
                    alt=""
                    className="object-cover w-full max-h-screen"
                />
            </div>
            <div className="absolute w-full max-w-md overflow-hidden">
                <div className="p-5 bg-white rounded-sm shadow-md">
                    <h6 className="mb-5 text-lg font-medium tracking-wide text-center text-gray-700">
                        Client Login
                    </h6>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label
                                htmlFor="nrp"
                                className="block mb-1 font-medium text-gray-700"
                            >
                                NRP
                            </label>
                            <input
                                value={data.nrp}
                                onChange={(e) => setData("nrp", e.target.value)}
                                type="text"
                                name="nrp"
                                id="nrp"
                                className="w-full p-1 border rounded-md appearance-none focus:outline-blue-500"
                            />
                            {errors.nrp && (
                                <span className="mt-1 text-red-500">
                                    {errors.nrp}
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="block mb-1 font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                name="password"
                                id="password"
                                className="w-full p-1 border rounded-md focus:outline-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white transition duration-200 rounded-sm bg-gradient-to-r from-teal-400 to-teal-700 hover:from-teal-500 hover:to-teal-800"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
