import { ButtonPrimary } from "@/components/buttons/button-primary";
import { ButtonSecondary } from "@/components/buttons/button-secondary";
import { ModalDefault } from "@/components/modals/modal-default";
import { TableColumn, TableDefault } from "@/components/tables/table-default";
import { fetchData } from "@/helpers/fetch";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { CollectionViewContent } from "./content";

export default async function CollectionViewPage({ params }: { params: { id: string } }) {
    const { result } = await fetchData(`collections/${params.id}`, 0);

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

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link href={'/admin/collections'} className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-md font-semibold text-white">
                        <FiArrowLeft size={16} />
                    </Link>
                    <span className="text-lg font-medium">Coleções - {result.name}</span>
                </div>
                <div className="flex gap-4">
                    <ButtonPrimary title="Editar coleção" />
                    <CollectionViewContent />
                </div>
            </div>
            <TableDefault columns={columns} data={result?.files ?? []} />
        </div>
    )
}