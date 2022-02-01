import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function NavLink({ to, children, ...props }) {
    return (
        <Link
            {...props}
            href={route(to)}
            className={`${
                route().current(to)
                    ? "text-blue-600 font-medium"
                    : "text-gray-400"
            } inline-flex px-5 mb-3 w-full hover:text-blue-600 items-center`}
        >
            {children}
        </Link>
    );
}
