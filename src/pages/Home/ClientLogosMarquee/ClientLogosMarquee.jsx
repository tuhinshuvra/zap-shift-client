import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/amazon.png"
import logo2 from "../../../assets/brands/amazon_vector.png"
import logo3 from "../../../assets/brands/casio.png"
import logo4 from "../../../assets/brands/moonstar.png"
import logo5 from "../../../assets/brands/randstad.png"
import logo6 from "../../../assets/brands/star.png"
import logo7 from "../../../assets/brands/start_people.png"

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogosMarquee = () => {
    return (
        <section className="py-4 my-8  max-w-6xl mx-auto">
            <p className=" text-center text-2xl font-extrabold my-4 text-[#053f68] ">We've helped thousands of sales teams</p>
            <Marquee
                speed={60}             // speed of the slide
                gradient={false}       // disable fade gradient
                pauseOnHover={true}    // pause when hovered
                className="flex items-center"
            >
                {logos.map((logo, index) => (
                    <div key={index} className="mx-8">
                        <img
                            src={logo}
                            alt={`Client ${index + 1}`}
                            className=" object-contain"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default ClientLogosMarquee;
