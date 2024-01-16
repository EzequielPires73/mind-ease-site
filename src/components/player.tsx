'use client'

import { getImageUrl } from "@/helpers/image";
import { useEffect, useRef } from "react";

interface Props {
    path: string;
    close: () => void;
    show: boolean;
    type?: 'audio' | 'video' | 'image'
}

export function Player({ path, close, show, type }: Props) {
    const ref = useRef(null);


    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    if (!show) return null;

    return (
        <div className="fixed z-[9999] top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 p-4">
            <div className="h-fit bg-white p-4 rounded-md" ref={ref}>
                {
                    (type == "audio" || type == "video") &&
                    <video controls width={500}>
                        <source src={getImageUrl(path)} />
                    </video>
                }

                {
                    type == 'image' &&
                    <div className="w-fit max-w-4xl max-h-[80vh] flex items-center justify-center">
                        <img src={getImageUrl(path)} alt="" className="object-contain" />
                    </div>
                }
            </div>
        </div>
    )
}