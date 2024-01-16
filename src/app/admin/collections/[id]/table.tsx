'use client'

import { TableActions, TableColumn, TableDefault } from "@/components/tables/table-default"
import { getImageUrl } from "@/helpers/image"
import { api } from "@/services/api"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CollectionViewContent } from "./content"
import { Player } from "@/components/player"

export function CollectionViewTable({ files, collectionId }) {
    const router = useRouter();
    const [fileSelected, setFileSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const columns: TableColumn[] = [
        {
            id: 1,
            name: 'Id',
            identifier: 'id',
            size: 80,
        },
        {
            id: 2,
            name: 'Tipo',
            identifier: 'type',
            size: 100,
        },
        {
            id: 3,
            name: 'Nome',
            identifier: 'name',
            size: 300,
        },
        {
            id: 4,
            name: 'Description',
            identifier: 'description',
            size: 300,
        },
        {
            id: 5,
            name: 'Path',
            identifier: 'path',
            size: 300,
        },
    ]

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

    const handleEdit = async (id: number) => {
        router.push(`/admin/collections/${collectionId}/file/${id}`);
    }

    const handleView = async (id: number) => {
        setFileSelected(files.find(item => item.id == id));
    }

    const action: TableActions = {
        onDelete: handleDelete,
        onView: handleView,
        onEdit: handleEdit
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{files.length} arquivos encontrados</span>
                <CollectionViewContent collectionId={collectionId} />
            </div>
            <TableDefault
                columns={columns}
                data={files ?? []}
                actions={action}
            />
            {fileSelected &&
                <Player path={fileSelected.path} close={() => setFileSelected(false)} show={true} />
            }
        </div>
    )
}