import { ButtonPrimary } from "@/components/buttons/button-primary";
import { TableColumn, TableDefault } from "@/components/tables/table-default";
import { fetchData } from "@/helpers/fetch";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { CollectionViewContent } from "./content";
import { CollectionViewTable } from "./table";
import { CollectionViewForm } from "./form";



export default async function CollectionViewPage({ params }: { params: { id: string } }) {
    const { result } = await fetchData(`collections/${params.id}`, 0);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <CollectionViewForm collection={result} />
            <CollectionViewTable files={result.files} collectionId={params.id} />
        </div>
    )
}