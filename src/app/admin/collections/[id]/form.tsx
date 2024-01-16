'use client'

import { ButtonDanger } from "@/components/buttons/button-danger";
import { ButtonPrimary } from "@/components/buttons/button-primary";
import { InputText } from "@/components/forms-components/input-text";
import { Textarea } from "@/components/forms-components/textarea";
import { ModalAlert } from "@/components/modals/modal-alert";
import { useForm } from "@/hooks/useForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export function CollectionViewForm({ collection }) {
    const router = useRouter();
    const name = useForm('text', collection.name);
    const description = useForm('text', collection.description);
    const [showAlert, setShowAlert] = useState(false);

    const handleDelete = async (id: number) => {

    }

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link href={'/admin/collections'} className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-md font-semibold text-white">
                        <FiArrowLeft size={16} />
                    </Link>
                    <span className="text-lg font-medium">Coleções - {collection.name}</span>
                </div>
                <div className="flex gap-4">
                    <ButtonDanger title="Deletar" onClick={() => setShowAlert(true)} />
                    <ButtonPrimary title="Salvar" />
                </div>
            </div>
            {showAlert &&
                <ModalAlert
                    show={showAlert}
                    onSubmit={() => handleDelete(collection.id)}
                    title={`Remover ${collection.name ?? collection.id}`}
                    subtitle={`Deseja mesmo remover o item ${collection.name ?? collection.id}?`}
                    close={() => setShowAlert(false)}
                />
            }
            <form className="flex flex-col gap-4 w-full max-w-lg">
                <InputText
                    id="name"
                    title="Nome da coleção"
                    placeholder="Insira o nome da coleção"
                    {...name}
                    error={null}
                />
                <Textarea
                    id="description"
                    title="Descrição da coleção"
                    placeholder="Insira a descrição da coleção"
                    {...description}
                />
            </form>
        </>
    )
}