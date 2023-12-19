import { ButtonPrimary } from "@/components/buttons/button-primary";
import { fetchData } from "@/helpers/fetch";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ButtonDanger } from "@/components/buttons/button-danger";
import { CollectionFileContent } from "./content";

export default async function CollectionFilePage({ params }: { params: { file: string, id: string } }) {
    const { result } = await fetchData(`collection-files/${params.file}`, 0);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <CollectionFileContent collectionFile={result} collectionId={params.id}/>
        </div>
    )
}