import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon?: React.FC;
}

export function ButtonIcon({ Icon, ...options }: Props) {
    return (
        <button
            className="bg-gray-300 hover:bg-gray-400 transition-colors h-7 w-7 flex justify-center items-center text-gray-700 rounded-sm"
            {...options}
        >
            <Icon />
        </button>
    )
}

