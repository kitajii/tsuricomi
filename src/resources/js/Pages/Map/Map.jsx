import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Map(props) {
    const center = useMemo(() => {
        return {
            lat: parseFloat(props.currentLocation.lat),
            lng: parseFloat(props.currentLocation.lng),
        };
    }, [props.currentLocation]);

    const showInfoWindow = () => {};
    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="w-full h-[75vh]"
        >
            <Marker position={center} onClick={showInfoWindow} />
        </GoogleMap>
    );
}
