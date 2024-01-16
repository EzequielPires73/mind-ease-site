'use client'

import { useEffect, useRef } from "react";
import { ButtonPrimary } from "../buttons/button-primary";
import { ButtonSecondary } from "../buttons/button-secondary";

interface Props {
    title: string;
    subtitle: string;
    onSubmit: () => void | Promise<void>;
    close: () => void;
    show: boolean;
}

export function ModalAlert({close, onSubmit, show, subtitle, title}: Props) {
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

    if(!show) return null;
    
    return (
        <div className="fixed z-[9999] top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
            <div className="w-full max-w-xl rounded-md bg-white p-3" ref={ref}>
                <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
                <p>{subtitle}</p>
                <div className="flex items-center justify-end gap-3 mt-4">
                    <ButtonSecondary 
                        title="Cancelar"
                        onClick={close}
                    />
                    <ButtonPrimary 
                        title="Continuar"
                        onClick={async () => {
                            await onSubmit();
                            close();
                        }}
                    />
                </div>
            </div>
        </div>
    )
}