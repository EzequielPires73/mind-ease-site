import { FiDownload, FiMusic, FiUsers, FiVideo } from "react-icons/fi";


export default function AdminPage() {
    return (
        <main className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-blue-100 rounded-lg flex flex-col gap-4 items-center justify-between py-8">
                    <div className="h-12 w-12 flex items-center justify-center bg-blue-500 rounded-md font-semibold text-white">
                        <FiUsers size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-blue-700">10</span>
                        <span className="text-lg font-bold text-blue-500">Usuários</span>
                    </div>
                </div>
                <div className="bg-red-100 rounded-lg flex flex-col gap-4 items-center justify-between py-8">
                    <div className="h-12 w-12 flex items-center justify-center bg-red-500 rounded-md font-semibold text-white">
                        <FiMusic size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-red-700">10</span>
                        <span className="text-lg font-bold text-red-500">Audios</span>
                    </div>
                </div>
                <div className="bg-green-100 rounded-lg flex flex-col gap-4 items-center justify-between py-8">
                    <div className="h-12 w-12 flex items-center justify-center bg-green-500 rounded-md font-semibold text-white">
                        <FiVideo size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-green-700">10</span>
                        <span className="text-lg font-bold text-green-500">Vídeos</span>
                    </div>
                </div>
                <div className="bg-purple-100 rounded-lg flex flex-col gap-4 items-center justify-between py-8">
                    <div className="h-12 w-12 flex items-center justify-center bg-purple-500 rounded-md font-semibold text-white">
                        <FiDownload size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-purple-700">10</span>
                        <span className="text-lg font-bold text-purple-500">Downloads</span>
                    </div>
                </div>
            </div>
        </main>
    )
}