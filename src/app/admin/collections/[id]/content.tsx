'use client'

import { InputText } from "@/components/forms-components/input-text";
import { Textarea } from "@/components/forms-components/textarea";
import { ModalDefault } from "@/components/modals/modal-default";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";
import { FiImage, FiMusic, FiTrash } from "react-icons/fi";

export function CollectionViewContent() {
    const name = useForm();
    const description = useForm();
    const [file, setFile] = useState<File>(null);
    const [thumbnail, setThumbnail] = useState<File>(null);

    return (
        <ModalDefault title="Upload de arquivo" submit={() => { }} buttonTitle="Upload de arquivo">
            <InputText
                id="name"
                title="Nome do arquivo"
                placeholder="Insira o nome do arquivo"
                {...name}
                error={null}
            />
            <Textarea
                id="description"
                title="Descrição do arquivo"
                placeholder="Insira a descrição do arquivo"
                {...description}
            />
            <input type="file" name="file" id="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
            <input type="file" name="thumbnail" id="thumbnail" className="hidden" onChange={e => setThumbnail(e.target.files[0])} />
            {
                file &&
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded shadow-md">
                    <div className="flex items-center gap-3">
                        <button className="h-10 w-10 flex items-center justify-center bg-primary-600 rounded-md font-semibold text-white">
                            <FiMusic size={16} />
                        </button>
                        <span className="text-base font-semibold text-primary-600">{file.name}</span>
                    </div>
                    <button onClick={() => setFile(null)} className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-md font-semibold text-white">
                        <FiTrash size={16} />
                    </button>
                </div>
            }
            <label htmlFor="file" className="cursor-pointer h-12 px-3 rounded-md bg-primary-100 text-primary-600 text-base font-semibold flex items-center justify-center">Escolher arquivo</label>
            {
                thumbnail &&
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded shadow-md">
                    <div className="flex items-center gap-3">
                        <button className="h-10 w-10 flex items-center justify-center bg-primary-600 rounded-md font-semibold text-white">
                            <FiImage size={16} />
                        </button>
                        <span className="text-base font-semibold text-primary-600">{thumbnail.name}</span>
                    </div>
                    <button onClick={() => setThumbnail(null)} className="h-10 w-10 flex items-center justify-center bg-red-500 rounded-md font-semibold text-white">
                        <FiTrash size={16} />
                    </button>
                </div>
            }
            <label htmlFor="thumbnail" className="cursor-pointer h-12 px-3 rounded-md bg-gray-600 text-white text-base font-semibold flex items-center justify-center">Escolher Thumbnail</label>
        </ModalDefault>
    )
}