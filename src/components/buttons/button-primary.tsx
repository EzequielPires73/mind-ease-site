'use client'

import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    Icon?: React.FC;
    full?: boolean;
}

export function ButtonPrimary({title, full, Icon, ...options}: Props) {
    return (
        <button className={`
            ${full ? 'w-full' : 'w-fit'}
            h-12 transition-colors rounded-md px-6 text-white font-medium text-base
            bg-primary-500 hover:bg-primary-600 active:bg-primary-600/90
            flex items-center justify-center gap-2
        `} {...options}>
            {Icon && <span className="text-xl text-white"><Icon /></span>}
            {title}
        </button>
    )
}