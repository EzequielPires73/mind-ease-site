'use client'

import { InputText } from "@/components/forms-components/input-text";
import Select from "@/components/forms-components/select";
import { Textarea } from "@/components/forms-components/textarea";
import { ModalDefault } from "@/components/modals/modal-default";
import { audioVideoFileFilter, imageFileFilter } from "@/helpers/file";
import { useForm } from "@/hooks/useForm";
import { useSelect } from "@/hooks/useSelect";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiImage, FiMusic, FiTrash } from "react-icons/fi";

export function CollectionViewContent({ collectionId }) {
    const router = useRouter();
    const name = useForm();
    const description = useForm();
    const type = useSelect([
        {
            id: 1,
            name: 'Audio',
            enum: 'audio'
        },
        {
            id: 2,
            name: 'Video',
            enum: 'video'
        },
    ])
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File>(null);
    const [errorFile, setErrorFile] = useState(null);
    const [thumbnail, setThumbnail] = useState<File>(null);
    const [errorThumbnail, setErrorThumbnail] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { success, result } = await api.post('collection-files', {
                name: name.value,
                description: description.value,
                type: type?.value?.enum,
                collectionId
            }).then(res => res.data);

            if (success && result.id) {
                if (file) {
                    const data = new FormData();
                    data.append('file', file);

                    const res = await api.post(`collection-files/upload/${result.id}`, data).then(res => res.data);
                }
                if (thumbnail) {
                    const data = new FormData();
                    data.append('file', thumbnail);

                    const res = await api.post(`collection-files/upload-thumbnail/${result.id}`, data).then(res => res.data);
                }
            }

            router.refresh();
        } catch (error) {

        }
    }

    const uploadFile = (file: File) => {
        if (file) {
            var fileSizeInMegabytes = file?.size / (1024 * 1024);
            if (fileSizeInMegabytes > 24000) {
                setErrorFile('Arquivo muito grande.')
            } else {
                if (audioVideoFileFilter(file)) {
                    { errorFile && setErrorFile(null) }
                    setFile(file);
                } else {
                    setErrorFile('Formato do arquivo deve ser de audio ou vídeo.')
                }
            }
        }
    }

    const uploadThumbnail = (file: File) => {
        if (imageFileFilter(file)) {
            { errorThumbnail && setThumbnail(null) }
            setThumbnail(file);
        } else {
            setErrorThumbnail('Formato do arquivo deve ser de imagem.')
        }
    }

    return (
        <ModalDefault title="Upload de arquivo" submit={() => handleSubmit()} buttonTitle="Upload de arquivo">
            <Select
                title="Tipo do arquivo"
                {...type}
            />
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
            <input type="file" name="file" id="file" className="hidden" onChange={e => uploadFile(e.target.files[0])} />
            <input type="file" name="thumbnail" id="thumbnail" className="hidden" onChange={e => uploadThumbnail(e.target.files[0])} />
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
            {errorFile && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">{errorFile}</span>}
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
            {errorThumbnail && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">{errorThumbnail}</span>}
            <label htmlFor="thumbnail" className="cursor-pointer h-12 px-3 rounded-md bg-gray-600 text-white text-base font-semibold flex items-center justify-center">Escolher Thumbnail</label>
        </ModalDefault>
    )
}