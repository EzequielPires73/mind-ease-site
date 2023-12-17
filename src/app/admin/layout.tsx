import { AdminHeader } from '@/components/headers/admin-header';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userData = cookies().get('user');

    if (!userData) {
        redirect('/');
    }

    const user = JSON.parse(userData?.value);

    if (user.role != 'admin' || user.role != 'super_admin')

        return (
            <main className='flex flex-col gap-6'>
                <AdminHeader user={user} />
                {children}
            </main>
        )
}