import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MyMapComponent = ({ property }) => {
  const [coordinates, setCoordinates] = useState(null);

  const customIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios/452/home.png",
    iconSize: [25, 25],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    // Funzione per ottenere le coordinate tramite l'API di Geocoding
    const getCoordinates = async (city) => {
      if (!city) {
        console.warn("Città non disponibile");
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          console.warn("Nessuna coordinata trovata, fallback a Roma");
          setCoordinates([41.8857, 12.4663]); // Fallback a Roma
        }
      } catch (error) {
        console.error("Errore nel recupero delle coordinate:", error);
        setCoordinates([41.8857, 12.4663]); // Fallback a Roma
      }
    };

    if (property?.city) {
      getCoordinates(property.city);
    }
  }, [property]);

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="md:w-1/2 w-full boxShad">
      <MapContainer
        key={coordinates.join(",")}
        center={coordinates}
        zoom={13}
        className="leaflet-container w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>La tua casa si trova qui!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
