'use client'

import { useForm } from "@/hooks/useForm";
import { ModalDefault } from "./modal-default";
import { InputText } from "../forms-components/input-text";
import { Textarea } from "../forms-components/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export function ModalCreateCollection({subcategory}) {
    const router = useRouter();
    const name = useForm();
    const description = useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const {} = await api.post('/collections', {
                name: name.value,
                description: description.value,
                subcategoryId: subcategory.id
            })

            router.refresh();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalDefault title="Cadastrar Coleção" submit={() => handleSubmit()} buttonTitle="Cadastrar coleção">
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
        </ModalDefault>
    )
}