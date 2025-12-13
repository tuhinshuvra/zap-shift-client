import benefit1 from "../../../assets/benefits/Illustration1.png"
import benefit2 from "../../../assets/benefits/Illustration2.png"
import benefit3 from "../../../assets/benefits/Illustration3.png"
import BenefitCard from "./BenifitCard";

const benefits = [
    {
        id: 1,
        image: benefit1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
        id: 2,
        image: benefit2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
        id: 3,
        image: benefit3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
];

const Benefits = () => {
    return (
        <section className="py-16  mx-auto">
            <div className="max-w-7xl mx-auto px-4">
                {/* <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Benefits</h2>
                    <p className="text-gray-600 mt-2">
                        Discover why our customers trust us for their deliveries.
                    </p>
                </div> */}

                {/* Benefits Cards */}
                {benefits.map((benefit) => (
                    <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                    ></BenefitCard>
                ))}
            </div>
        </section>
    );
};
export default Benefits