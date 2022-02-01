import React, { useEffect } from "react";
import { usePage, Head } from "@inertiajs/inertia-react";
import toast, { Toaster } from "react-hot-toast";

export default function PemilihanDashboard({ children }) {
    const { auth, flash } = usePage().props;

    useEffect(() => {
        if (flash.status) toast[flash.status](flash.messages);
    }, [flash]);

    return (
        <div className="flex flex-col h-screen">
            <Head title="Pilketos" />
            <Toaster position="bottom-right" reverseOrder={false} />
            <header className="shadow-md bg-gray-50">
                <nav className="flex items-center justify-between w-full max-w-5xl px-4 py-4 mx-auto">
                    <h1 className="text-2xl font-semibold tracking-wide text-gray-700">
                        Pilketos
                    </h1>

                    <div className="inline-flex items-center justify-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${auth.name}`}
                            alt={auth.name}
                            className="flex-shrink-0 mr-3 rounded-full w-9 h-9"
                        />
                        {auth.name}
                    </div>
                </nav>
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="border bg-gray-50">
                <div className="px-4 py-2">
                    <div className="container mx-auto">
                        &copy; Pilketos 2022
                    </div>
                </div>
            </footer>
        </div>
    );
}
