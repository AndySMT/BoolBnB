import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMapComponent = ({ property }) => {
  const [coordinates, setCoordinates] = useState(null);

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
          setCoordinates([41.8857, 12.4663]);
        }
      } catch (error) {
        console.error("Errore nel recupero delle coordinate:", error);
        setCoordinates([41.8857, 12.4663]);
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
        <Marker position={coordinates} />
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
