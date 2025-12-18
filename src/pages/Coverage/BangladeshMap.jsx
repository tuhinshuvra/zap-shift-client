import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import { useState } from "react";
// import deliveryIcon from "../assets/delivery-marker.png";

function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 })
    }
    return null;
}

const BangladeshMap = ({ serviceCenters }) => {
    const [searchTest, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    // Default location: Dhaka, Bangladesh
    const position = [23.8103, 90.4125];

    // const customIcon = new L.Icon({
    //     iconUrl: deliveryIcon,
    //     iconSize: [40, 40],       // size of the icon
    //     iconAnchor: [20, 40],     // point of the icon which will correspond to marker's location
    //     popupAnchor: [0, -40],    // point from which the popup should open
    // });

    const handleSearch = (e) => {
        e.preventDefault();
        const district = serviceCenters.find(d =>
            d.district.toLowerCase().includes(searchTest.toLocaleLowerCase())
        );
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district)
        }
    }


    return (
        <div className="h-[800px] w-full rounded-xl overflow-hidden shadow-md">

            <form onSubmit={handleSearch} className="flex justify-center my-4">
                <input type="text"
                    placeholder="Search district"
                    className="input input-bordered w-full max-w-md"
                    value={searchTest}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-r-md">Enter Search</button>
            </form>

            <MapContainer
                center={position}
                zoom={8}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                {/* Map tiles */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                <FlyToDistrict coords={activeCoords}></FlyToDistrict>

                {
                    serviceCenters.map((center, index) => <Marker
                        key={index}
                        position={[center.latitude, center.longitude]}
                    // icon={customIcon}
                    >
                        <Popup autoOpen={center.district === activeDistrict}>
                            <strong>{center.district}</strong> <br />
                            {center.covered_area.join(', ')}
                        </Popup>

                    </Marker>)
                }
                {/* <Marker position={position}>
                    <Popup>
                        We are available across Bangladesh
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div >
    );
};

export default BangladeshMap;
