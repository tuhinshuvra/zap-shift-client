import React from "react";

const BenefitCard = ({ benefit }) => {

    const { image, title, description } = benefit;

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg overflow-hidden mb-8 p-4 max-w-6xl mx-auto">
            {/* Left Side: small image */}
            <div className="flex-shrink-0 w-36 h-36">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            {/* Vertical line separator */}
            {/* <div className="w-px bg-gray-300 mx-8 h-36"></div> */}
            <hr className="w-full border-t border-dashed border-gray-300 my-3 md:hidden" />
            <div className="hidden md:block h-30 border-l border-dashed border-[#123456] mx-4"></div>



            {/* Right Side: Title + Description */}
            <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 text-[#123456]">{title}</h3>
                <p className="text-gray-700 text-sm">{description}</p>
            </div>
        </div>
    );
};
export default BenefitCard;