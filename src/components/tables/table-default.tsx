'use client'
import { useRouter } from "next/navigation";

export interface TableColumn {
    id: number | string,
    name: string,
    size: number,
    identifier: string,
    action?: () => void;
}

interface Props {
    columns: Array<TableColumn>,
    data: Array<any>,
    forwardLink?: (id) => string
}

export function TableDefault({ columns, data, forwardLink }: Props) {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 w-full">
            <header className="h-12 w-full bg-gray-700 rounded-md flex gap-4 px-4 items-center text-white">
                {
                    columns.map(column => (
                        <div key={column.id} className={`flex text-base font-medium`} style={{ width: column.size }}>{column.name}</div>
                    ))
                }
            </header>
            <div className="border border-gray-300 w-full rounded-md">
                {data.length == 0 && <span className={`h-12 w-full flex gap-4 px-4 items-center hover:bg-gray-100 transition-all cursor-pointer text-gray-800`}>0 resultados</span>}
                {data.map((item, index) => (
                    <div onClick={() => {forwardLink && router.push(forwardLink(item?.id))}} key={item?.id ?? index} className={`h-12 w-full flex gap-4 px-4 items-center hover:bg-gray-100 transition-all cursor-pointer text-gray-800 ${index < data.length - 1 && 'border-b'}`}>
                        {
                            columns.map(column => (
                                <div key={column.id} className={`flex text-base font-medium`} style={{ width: column.size }}>{item[column.identifier]}</div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}