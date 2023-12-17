'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiChevronDown } from "react-icons/fi";

const pages = [
    {
        id: 1,
        name: 'Painel',
        link: '/admin'
    },
    {
        id: 2,
        name: 'Usuários',
        link: '/admin/users'
    },
    {
        id: 3,
        name: 'Coleções',
        link: '/admin/collections'
    },
]

export function AdminHeader({ user }) {
    const path = usePathname();

    return (
        <header className="w-full pt-6">
            <nav className="h-20 w-full max-w-7xl mx-auto rounded-lg bg-gray-900 flex items-center justify-between text-white px-8">
                <ul className="flex gap-8">
                    {pages.map(page => (
                        <li key={page.id}>
                            <Link href={page.link} className={`${path == page.link && 'bg-gray-700'} rounded-md text-lg px-3 h-10 flex items-center justify-center border-md`}>{page.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-700 rounded-md font-semibold">{user?.name?.substring(0, 1)}</div>
                    <div className="flex flex-col">
                        <span>{user.name}</span>
                        <span className="text-xs">{user.email}</span>
                    </div>
                    <button className="mt-1"><FiChevronDown /></button>
                </div>
            </nav>
        </header>
    )
}