import zapshift from '../../assets/big-deliveryman.png';
import { Link } from "react-router";

const AboutUs = () => {

    const services = [
        { title: "Door-to-Door Delivery", description: "We pick up and deliver parcels directly to your doorstep, anywhere in the country." },
        { title: "Nationwide Coverage", description: "From Dhaka to Rangpur, we have service centers across all major cities and districts." },
        { title: "Real-Time Tracking", description: "Track your parcel in real-time with our easy-to-use tracking system." },
        { title: "Secure & Reliable", description: "Your parcels are handled safely with proper packaging and insurance options." },
    ];

    const team = [
        { name: "Shuvra Rahman", role: "CEO & Founder", image: "https://i.pravatar.cc/150?img=1" },
        { name: "Sadannda Ram", role: "Operations Head", image: "https://i.pravatar.cc/150?img=2" },
        { name: "Abdur Razzak", role: "Logistics Manager", image: "https://i.pravatar.cc/150?img=3" },
        { name: "Mohammad Karim", role: "Customer Support Lead", image: "https://i.pravatar.cc/150?img=4" },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-16">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                        Zap Shift - Fast & Reliable Courier Service
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Delivering parcels across Bangladesh with speed, reliability, and care. From Dhaka to Rangpur, we connect cities and districts efficiently.
                    </p>
                    <Link to="/sendParcel" className="btn btn-primary">Book a Parcel</Link>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={zapshift}
                        alt="Courier Service"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Services Section */}
            <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
                    Our Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div key={service.title} className="card p-6 border border-gray-200 shadow hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Coverage Section */}
            <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
                    Nationwide Coverage
                </h2>
                <p className="text-center text-gray-700 mb-6">
                    We have service centers in all major regions and districts, ensuring your parcel reaches its destination efficiently.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                    {["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh"].map((region) => (
                        <div key={region} className="p-4 bg-base-100 shadow rounded">
                            <h3 className="font-semibold">{region}</h3>
                            <p className="text-gray-500">Multiple Service Centers</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section>
                <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
                    Meet Our Team
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map((member) => (
                        <div key={member.name} className="card shadow p-4 text-center hover:scale-105 transition-transform duration-300">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-full mx-auto w-32 h-32 mb-4 object-cover"
                            />
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="bg-primary text-white rounded-lg p-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Send Your Parcel?
                </h2>
                <p className="mb-6">
                    Book your shipment online or contact our support team for assistance.
                </p>
                <Link to="/sendParcel" className="btn btn-accent">Book Now</Link>
            </section>
        </div>
    );
};
export default AboutUs;