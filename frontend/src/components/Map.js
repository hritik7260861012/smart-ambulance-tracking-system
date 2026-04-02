import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQ4OTY5NzlkYjM5MDQyYTliYThiMTBkZmJlMThmOGMwIiwiaCI6Im11cm11cjY0In0="; // 👈 new key daal

const ambulanceIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
    iconSize: [40, 40]
});

const hospitalIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
    iconSize: [35, 35]
});

function MoveMap({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function Map() {
    const [routePath, setRoutePath] = useState([]);
    const [position, setPosition] = useState([25.2138, 75.8648]);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                console.log("Backend call...");

                const backendRes = await fetch("http://localhost:8080/route");
                const data = await backendRes.json();

                const start = [data.start[1], data.start[0]];
                const end = [data.end[1], data.end[0]];

                console.log("Calling ORS...");

                const res = await fetch(
                    "https://api.openrouteservice.org/v2/directions/driving-car",
                    {
                        method: "POST",
                        headers: {
                            Authorization: API_KEY,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            coordinates: [start, end]
                        })
                    }
                );

                // ❌ Agar ORS fail ho jaye
                if (!res.ok) {
                    throw new Error("ORS FAILED");
                }

                const json = await res.json();

                const coords = json.features[0].geometry.coordinates;
                const formatted = coords.map(c => [c[1], c[0]]);

                setRoutePath(formatted);
                setPosition(formatted[0]);

            } catch (err) {
                console.log("❌ ORS FAIL → using fallback");

                // 🔥 FALLBACK ROUTE (direct line)
                const fallback = [
                    [25.2138, 75.8648],
                    [26.9124, 75.7873]
                ];

                setRoutePath(fallback);
                setPosition(fallback[0]);
            }
        };

        fetchRoute();
    }, []);

    // movement
    useEffect(() => {
        if (!started || routePath.length === 0) return;

        let i = 0;

        const interval = setInterval(() => {
            if (i < routePath.length) {
                setPosition(routePath[i]);
                i++;
            }
        }, 500);

        return () => clearInterval(interval);
    }, [started, routePath]);

    return (
        <>
            <button onClick={() => setStarted(true)}>
                🚑 Start Ride
            </button>

            <MapContainer center={position} zoom={7} style={{ height: "500px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MoveMap position={position} />

                <Marker position={position} icon={ambulanceIcon}>
                    <Popup>🚑 Ambulance</Popup>
                </Marker>

                <Polyline positions={routePath} color="red" />

                <Marker position={[26.9124, 75.7873]} icon={hospitalIcon}>
                    <Popup>🏥 Hospital</Popup>
                </Marker>
            </MapContainer>
        </>
    );
}

export default Map;