import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Map from "./Map";
import { CircularProgress } from "@mui/material";

export default function MapPage(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    });

    const [myLocation, setMyLocation] = useState({
        lat: null,
        lng: null,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setMyLocation({
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    MAP画面
                </h2>
            }
        >
            <Head title="MAP画面" />

            <div>
                <div>
                    {!isLoaded || myLocation.lat == null ? (
                        <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"/>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Map
                                myLocation={myLocation}
                                weatherList={props.weatherList}
                                windDirectionList={props.windDirectionList}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
