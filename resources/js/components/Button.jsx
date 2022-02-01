import React, { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
    return (
        <button
            ref={ref}
            {...props}
            className={`${
                props.className
                    ? props.className
                    : "bg-blue-500 hover:bg-blue-600 text-white"
            } px-4 py-2 text-sm font-medium transition duration-200 rounded-md`}
        >
            {props.children}
        </button>
    );
});

export default Button;
