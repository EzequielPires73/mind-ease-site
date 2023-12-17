'use client'

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    Icon?: React.FC;
    full?: boolean;
}

export function ButtonSecondary({title, full, Icon, ...options}: Props) {
    return (
        <button className={`
            ${full ? 'w-full' : 'w-fit'}
            h-12 transition-colors rounded-md px-6 text-gray-800 font-medium text-base
            bg-gray-200 hover:bg-gray-300 active:bg-gray-400
            flex items-center justify-center gap-2
        `} {...options}>
            {Icon && <span className="text-xl text-white"><Icon /></span>}
            {title}
        </button>
    )
}