import { Accordion } from "@/components/accordion";
import { ButtonPrimary } from "@/components/buttons/button-primary";
import { ButtonSecondary } from "@/components/buttons/button-secondary";
import { TableColumn, TableDefault } from "@/components/tables/table-default";
import { fetchData } from "@/helpers/fetch";
import { getImageUrl } from "@/helpers/image";
import { Content } from "./content";

export default async function AdminPage() {
    const { results } = await fetchData('categories', 0);

    return (
        <main className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
                {
                    results.map(category => (
                        <Accordion title={category.name} key={category.id}>
                            <div className="flex justify-between w-full items-center">
                                <strong>Subcategorias de {category.name}</strong>
                                <div className="flex gap-4">
                                    <ButtonPrimary
                                        title="Editar"
                                    />
                                    <ButtonSecondary
                                        title="Cadastrar"
                                    />
                                </div>
                            </div>
                            <Content subcategories={category.subcategories}/>
                        </Accordion>
                    ))
                }
            </div>
        </main>
    )
}

