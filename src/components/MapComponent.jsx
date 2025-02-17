import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MyMapComponent = ({ property }) => {
    const [coordinates, setCoordinates] = useState([41.9028, 12.4964]);

    const customIcon = new L.Icon({
        iconUrl: "https://img.icons8.com/dusk/64/order-delivered.png",
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    useEffect(() => {
        // funzione per ottenere le coordinate con API di Geocoding
        const getCoordinates = async (city) => {
            try {
                if (!city) throw Error();
                const response = await axios(
                    `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`
                );
                const data = await response.data;
                if (data && data.length > 0) {
                    setCoordinates([
                        parseFloat(data[0].lat),
                        parseFloat(data[0].lon),
                    ]);
                } else {
                    console.warn("Nessuna coordinata trovata, fallback a Roma");
                }
            } catch (error) {
                console.log("Errore nel recupero delle coordinate:", error);
            }
        };

        getCoordinates(property?.city);
    }, [property?.city]);

    // se le coordinate non sono ancora caricate, mostra un messaggio di caricamento
    if (!coordinates) {
        return <div>Loading map...</div>;
    }

    // aggiorna la mappa ogni volta che le coordinate cambiano
    const MapCenter = () => {
        const map = useMap();
        map.setView(coordinates); 
        return null;
    };

    return (
        <MapContainer
            center={coordinates}
            zoom={13}
            scrollWheelZoom={false} // Disabilita lo zoom con lo scroll
            className="leaflet-container w-full h-full min-h-[200px] overscroll-contain"
            whenCreated={(map) => {
                // Abilita lo scroll zoom solo quando il mouse entra nella mappa
                map.on("mouseenter", () => {
                    map.scrollWheelZoom.enable();
                });

                // Disabilita lo scroll zoom quando il mouse esce dalla mappa
                map.on("mouseleave", () => {
                    map.scrollWheelZoom.disable();
                });
            }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapCenter /> {/* Forza il ricalcolo del centro */}
            <Marker position={coordinates} icon={customIcon}>
                <Popup>
                    <span className="text-emerald-500 text-base font-semibold">
                        La tua casa si trova qui!
                    </span>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MyMapComponent;
