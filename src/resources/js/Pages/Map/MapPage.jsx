import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Map from "./Map";

export default function MapPage(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    });
    const [currentLocation, setCurrentLocation] = useState({
        lat: null,
        lng: null,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);

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
                        {!isLoaded || currentLocation.lat == null ? (
                            <div className="p-6 text-gray-900">
                                MAP読み込み中...
                            </div>
                        ) : (
                            <Map currentLocation={currentLocation} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
