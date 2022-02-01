import React from "react";
import { Dialog } from "@headlessui/react";

export default function Modal({
    targetRef,
    openState,
    closeState,
    title,
    children,
    size,
}) {
    return (
        <Dialog
            initialFocus={targetRef}
            open={openState}
            onClose={() => closeState(false)}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="flex items-center justify-center h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div
                    className={`${
                        size ? size : "w-full max-w-lg"
                    } relative mx-auto overflow-hidden bg-white border rounded-lg`}
                >
                    <div className="p-2 font-medium tracking-wide bg-gray-100">
                        <Dialog.Title>{title}</Dialog.Title>
                    </div>
                    {children}
                </div>
            </div>
        </Dialog>
    );
}
