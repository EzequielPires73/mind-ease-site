'use client'

import { ButtonDanger } from "@/components/buttons/button-danger";
import { ButtonPrimary } from "@/components/buttons/button-primary";
import { CardFile } from "@/components/cards/card-file";
import { InputText } from "@/components/forms-components/input-text";
import Select from "@/components/forms-components/select";
import { Textarea } from "@/components/forms-components/textarea";
import { ModalAlert } from "@/components/modals/modal-alert";
import { audioVideoFileFilter, imageFileFilter } from "@/helpers/file";
import { useForm } from "@/hooks/useForm";
import { useSelect } from "@/hooks/useSelect";
import { api } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const CollectionFileTypes = [
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
];

export function CollectionFileContent({ collectionFile, collectionId }) {
    const router = useRouter();
    const name = useForm('text', collectionFile.name);
    const description = useForm('text', collectionFile.description);
    const type = useSelect(CollectionFileTypes, collectionFile?.type && CollectionFileTypes.find(item => item.enum == collectionFile.type))
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState<File>(null);
    const [errorFile, setErrorFile] = useState(null);
    const [thumbnail, setThumbnail] = useState<File>(null);
    const [errorThumbnail, setErrorThumbnail] = useState(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { success, result } = await api.patch(`collection-files/${collectionFile.id}`, {
                name: name.value,
                description: description.value,
                type: type?.value?.enum,
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

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            const { success, message } = await api.delete(`collection-files/${id}`).then(res => res.data);
            if (success) {
                router.refresh();
            } else {
                throw new Error(message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link href={`/admin/collections/${collectionId}`} className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-md font-semibold text-white">
                        <FiArrowLeft size={16} />
                    </Link>
                    <span className="text-lg font-medium">Arquivo - {collectionFile.name}</span>
                </div>
                <div className="flex gap-4">
                    <ButtonDanger title="Deletar" onClick={() => setShowAlert(true)} />
                    <ButtonPrimary title="Salvar alterações" onClick={handleSubmit} />
                </div>
            </div>
            <form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={e => e.preventDefault()}>
                {showAlert &&
                    <ModalAlert
                        show={showAlert}
                        onSubmit={() => handleDelete(collectionFile.id)}
                        title={`Remover ${collectionFile.name ?? collectionFile.id}`}
                        subtitle={`Deseja mesmo remover o item ${collectionFile.name ?? collectionFile.id}?`}
                        close={() => setShowAlert(false)}
                    />
                }
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
                {file && <CardFile file={file} />}
                {collectionFile.path && <CardFile file={collectionFile.path} />}
                {errorFile && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">{errorFile}</span>}
                <label htmlFor="file" className="cursor-pointer h-12 px-3 rounded-md bg-primary-100 text-primary-600 text-base font-semibold flex items-center justify-center">Escolher arquivo</label>
                { thumbnail && <CardFile file={thumbnail}/> }
                { collectionFile.thumbnail_path && <CardFile file={collectionFile.thumbnail_path}/> }
                {errorThumbnail && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">{errorThumbnail}</span>}
                <label htmlFor="thumbnail" className="cursor-pointer h-12 px-3 rounded-md bg-gray-600 text-white text-base font-semibold flex items-center justify-center">Escolher Thumbnail</label>

            </form>
        </>
    )
}