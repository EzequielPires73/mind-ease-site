import { ButtonPrimary } from "@/components/buttons/button-primary";
import { TableColumn, TableDefault } from "@/components/tables/table-default";
import { fetchData } from "@/helpers/fetch";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { CollectionViewContent } from "./content";
import { CollectionViewTable } from "./table";



export default async function CollectionViewPage({ params }: { params: { id: string } }) {
    const { result } = await fetchData(`collections/${params.id}`, 0);

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
                    <CollectionViewContent collectionId={params.id} />
                </div>
            </div>
            <CollectionViewTable files={result.files} collectionId={params.id} />
        </div>
    )
}