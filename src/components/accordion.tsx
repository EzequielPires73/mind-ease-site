'use client'

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props {
    title: string,
    children: any,
}

export function Accordion({ title, children }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className={`flex flex-col w-full h-fit rounded-md border ${show && 'border-primary-500'}`}>
            <button className={`
                flex items-center justify-between 
                px-4 h-16 
                ${show ? 'bg-primary-500/10 text-primary-500 rounded-t' : 'hover:bg-gray-50 rounded-md' }
                transition-colors font-medium
            `}
                onClick={() => setShow(!show)}
            >
                {title}
                {show ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <div className={`
                ${show ? 'h-auto p-4' : 'h-0 overflow-hidden'}
                flex flex-col gap-4
            `}>
                {children}
            </div>
        </div>
    )
}