import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import agent from '../../../assets/agent-pending.png';

const BeARider = () => {
    const { user } = useAuth();
    const [serviceCenters, setServiceCenters] = useState([]);

    useEffect(() => {
        fetch("/serviceCenter.json")
            .then((res) => res.json())
            .then((data) => setServiceCenters(data))
            .catch((err) => console.error(err));
    }, []);

    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        age: "",
        region: "",
        district: "",
        phone: "",
        nid: "",
        bikeBrand: "",
        bikeAge: "",
        bikeRegNo: "",
        bikeRegRenewDate: "",
        status: "pending",
    });

    const regions = [...new Set(serviceCenters.map((c) => c.region))];
    const districts = serviceCenters
        .filter((c) => c.region === formData.region)
        .map((c) => c.district);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Rider Application:", formData);
        // submit to backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white shadow-lg rounded-2xl p-6">
                {/* Left: Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-semibold">Be a Rider</h2>

                    <input
                        name="name"
                        value={formData.name}
                        readOnly
                        className="input input-bordered w-full"
                    />

                    <input
                        name="email"
                        value={formData.email}
                        readOnly
                        className="input input-bordered w-full"
                    />

                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Region</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>

                    <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    <input
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        name="nid"
                        placeholder="National ID Number"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        name="bikeBrand"
                        placeholder="Bike Brand"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        name="bikeAge"
                        placeholder="Bike Age (years)"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        name="bikeRegNo"
                        placeholder="Bike Registration No"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="date"
                        name="bikeRegRenewDate"
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <button className="btn btn-primary w-full">Apply</button>
                </form>

                {/* Right: Image */}
                <div className="flex items-center justify-center">
                    <img
                        src={agent}
                        alt="Rider"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default BeARider;
