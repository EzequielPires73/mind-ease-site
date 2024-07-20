'use client'

import { ModalDefault } from "./modal-default";

export function ModalCreateSubcategory() {
    const handleSubmit = async () => {

    }
    
    return (
        <ModalDefault title="Cadastrar Subcategoria" submit={() => handleSubmit()} buttonTitle="Cadastrar subcategoria">

        </ModalDefault>
    )
}