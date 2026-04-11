import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Popup,
    useMap,
    Circle
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQ4OTY5NzlkYjM5MDQyYTliYThiMTBkZmJlMThmOGMwIiwiaCI6Im11cm11cjY0In0="; // 👈 new key daal

const ambulanceIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
    iconSize: [50, 50],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 40]
});

const hospitalIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
    iconSize: [45, 45],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 40]
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
        <div className="map-container-wrapper">
            <div className="control-panel">
                <h1>🚑 Ambulance Tracker</h1>
                <button
                    className={`start-button ${started ? 'started' : ''}`}
                    onClick={() => setStarted(true)}
                    disabled={started}
                >
                    {started ? '⏸️ Ride In Progress' : '🚑 Start Ride'}
                </button>
                <div className="status-indicator">
                    <span className={`status-dot ${started ? 'active' : 'inactive'}`}></span>
                    <span>{started ? 'Active' : 'Waiting'}</span>
                </div>
            </div>

            <MapContainer center={position} zoom={7} style={{ height: "500px" }} className="map-canvas">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MoveMap position={position} />

                {/* Ambulance location indicator */}
                <Circle center={position} radius={2000} color="#FF6B6B" fillColor="#FFE66D" fillOpacity={0.2} weight={2} />

                <Marker position={position} icon={ambulanceIcon}>
                    <Popup className="custom-popup">
                        <div style={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                            🚑 Ambulance
                        </div>
                    </Popup>
                </Marker>

                {/* Route with gradient effect */}
                <Polyline
                    positions={routePath}
                    color="#FF6B6B"
                    weight={4}
                    opacity={0.8}
                    lineCap="round"
                    lineJoin="round"
                />

                {/* Hospital location indicator */}
                <Circle center={[26.9124, 75.7873]} radius={1500} color="#4ECDC4" fillColor="#4ECDC4" fillOpacity={0.1} weight={2} />

                <Marker position={[26.9124, 75.7873]} icon={hospitalIcon}>
                    <Popup className="custom-popup">
                        <div style={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                            ➕🛑 Hospital
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;