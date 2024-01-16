import React from "react";

import { checkFileType } from "@/helpers/file";
import { useState } from "react";
import { FiImage, FiMusic, FiTrash, FiVideo } from "react-icons/fi";
import { Player } from "../player";

const getName = (path: string) => {
    let array = path.split('/');

    return array[array.length - 1];
}

export function CardFile({ file, onRemove }: { file: string | File, onRemove?: () => void }) {
    const [show, setShow] = useState(false);
    const name = typeof file == 'string' ? getName(file) : file.name;
    const type = checkFileType(name);

    return (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded shadow-md">
            <div className="flex items-center gap-3">
                <button onClick={() => {
                    setShow(true)
                }} className="h-10 w-10 flex items-center justify-center bg-primary-600 rounded-md font-semibold text-white">
                    {type == 1 && <FiMusic size={16} />}
                    {type == 2 && <FiVideo size={16} />}
                    {type == 3 && <FiImage size={16} />}
                </button>
                <span className="text-base font-semibold text-primary-600">{name}</span>
            </div>
            <Player
                show={show}
                close={() => setShow(false)}
                path={typeof file == 'string' ? file : URL.createObjectURL(file)}
                type={type == 1 || type == 2 ? 'audio' : 'image'}
            />
            <button onClick={onRemove} className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-md font-semibold text-white">
                <FiTrash size={16} />
            </button>
        </div>
    )
}