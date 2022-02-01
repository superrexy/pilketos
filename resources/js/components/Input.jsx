import React from "react";

export default function Input({ type, className, ...props }) {
    return (
        <input
            {...props}
            type={type ?? "text"}
            className={`block w-full px-3 py-2 border rounded-lg focus:shadow focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 ${
                className ?? ""
            }`}
        />
    );
}
