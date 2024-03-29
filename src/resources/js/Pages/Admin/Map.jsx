import AuthenticatedLayout from "@/Layouts/AdminAuthenticated";
import { Head } from "@inertiajs/react";

export default function Map(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    MAP画面
                </h2>
            }
        >
            <Head title="MAP画面" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            MAP表示する予定の画面です
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
