'use client'

import { Accordion } from "@/components/accordion"
import { ButtonPrimary } from "@/components/buttons/button-primary"
import { ButtonSecondary } from "@/components/buttons/button-secondary"
import { ModalCreateCollection } from "@/components/modals/modal-create-collection"
import { TableColumn, TableDefault } from "@/components/tables/table-default"
import { getImageUrl } from "@/helpers/image"

export function Content({ subcategories }) {
    const columns: Array<TableColumn> = [
        {
            id: 1,
            name: 'Id',
            size: 80,
            identifier: 'id',
        },
        {
            id: 2,
            name: 'Nome',
            size: 300,
            identifier: 'name'
        },
        {
            id: 3,
            name: 'Descrição',
            size: 300,
            identifier: 'description'
        },
    ]

    return (
        <>
            {
                subcategories.map(subcategory => (
                    <Accordion title={subcategory.name} key={subcategory.id}>
                        <img src={getImageUrl(subcategory.image)} alt="" className="h-20 w-20" />
                        <div className="flex justify-between w-full items-center">
                            <strong>Coleções de {subcategory.name}</strong>
                            <div className="flex gap-4">
                                <ButtonPrimary
                                    title="Editar"
                                />
                                <ModalCreateCollection subcategory={subcategory}/>
                            </div>
                        </div>
                        <TableDefault columns={columns} data={subcategory.collections} forwardLink={(id) => `/admin/collections/${id}`} />
                    </Accordion>
                ))
            }
        </>
    )
}