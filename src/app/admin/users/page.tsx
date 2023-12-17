import { TableDefault } from "@/components/tables/table-default";
import { fetchData } from "@/helpers/fetch";

const columns = [
    {
        id: 1,
        name: 'Id',
        size: 80,
        identifier: 'id'
    },
    {
        id: 2,
        name: 'Nome',
        size: 300,
        identifier: 'name'
    },
    {
        id: 3,
        name: 'Email',
        size: 300,
        identifier: 'email'
    },
    {
        id: 4,
        name: 'Telefone',
        size: 200,
        identifier: 'phone'
    },
    {
        id: 5,
        name: 'Role',
        size: 120,
        identifier: 'role'
    }
]

export default async function AdminPage() {
    const { results } = await fetchData('users');

    return (
        <main className="w-full max-w-7xl mx-auto">
            <TableDefault columns={columns} data={results} />
        </main>
    )
}