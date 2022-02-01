import React from "react";

export default function Label({ inputFor, children }) {
    return (
        <label
            htmlFor={inputFor}
            className="block mb-1 text-sm font-semibold leading-6 text-gray-700"
        >
            {children}
        </label>
    );
}
