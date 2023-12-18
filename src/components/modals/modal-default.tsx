'use client'

import { useState } from "react";
import { ButtonSecondary } from "../buttons/button-secondary";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
    submit: () => void;
    title: string;
    buttonTitle?: string;
    children?: any;
}

export function ModalDefault({ submit, title, buttonTitle, children }: Props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ButtonSecondary title={buttonTitle} onClick={() => setShowModal(true)} />
            {
                showModal &&
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md min-h-[500px] rounded-md">
                        <header className="h-16 bg-primary-500 rounded-t-md flex items-center justify-between px-3">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setShowModal(false)} className="h-10 w-10 flex items-center justify-center bg-primary-600 rounded-md font-semibold text-white">
                                    <FiArrowLeft size={16} />
                                </button>
                                <span className="text-lg font-medium text-white">{title}</span>
                            </div>
                            <button className="h-10 px-3 rounded-md bg-primary-600 text-white text-base font-medium">Salvar</button>
                        </header>
                        <div className="p-3 flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}