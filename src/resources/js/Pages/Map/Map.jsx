import { Button } from "@mui/material";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import CreateRecordModal from "./CreateRecordModal";

export default function Map({ myLocation, weatherList, windDirectionList }) {
    const [center, setCenter] = useState(null);

    const currentLocation = useMemo(() => {
        return {
            lat: parseFloat(myLocation.lat),
            lng: parseFloat(myLocation.lng),
        };
    }, [myLocation]);

    useEffect(() => {
        setCenter(currentLocation);
    }, [currentLocation]);

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [createRecordModalOpen, setCreateRecordModalOpen] = useState(false);

    const onClickMarkerHandler = (e) => {
        setCenter({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
        setInfoWindowOpen(true);
    };

    return (
        <>
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="w-full h-[75vh]"
                options={
                    {
                        fullscreenControl: false
                    }
                }
            >
                <Marker
                    position={currentLocation}
                    onClick={onClickMarkerHandler}
                />
                {infoWindowOpen && (
                    <InfoWindow
                        position={currentLocation}
                        onCloseClick={() => setInfoWindowOpen(false)}
                    >
                        <Button
                            variant="contained"
                            className="bg-green-600"
                            onClick={() => setCreateRecordModalOpen(true)}
                        >
                            このポイントで釣果登録
                        </Button>
                    </InfoWindow>
                )}
            </GoogleMap>
            <CreateRecordModal
                location={currentLocation}
                createRecordModalOpen={createRecordModalOpen}
                setCreateRecordModalOpen={setCreateRecordModalOpen}
                weatherList={weatherList}
                windDirectionList={windDirectionList}
            />
        </>
    );
}
