import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon?: React.FC;
}

export function ButtonIcon({ Icon, ...options }: Props) {
    return (
        <button
            className="bg-primary-100 hover:bg-primary-200 active:bg-primary-300 transition-colors h-7 w-7 flex justify-center items-center text-primary-500 rounded"
            {...options}
        >
            <Icon />
        </button>
    )
}

