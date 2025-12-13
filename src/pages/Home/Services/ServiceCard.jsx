import React from "react";

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;

    return (
        <div className="
        card bg-base-100 shadow-md
        transition-all duration-300
        hover:bg-[#9ef684] 

        hover:shadow-xl
      " >
            <div className="card-body items-center text-center">
                {/* <div className="text-primary text-4xl mb-4"> */}
                <div className="
                text-4xl bg-gray-100 rounded-full 
                w-16 h-16 flex items-center justify-center 
                mb-4 transition-colors duration-300
          ">

                    <Icon></Icon>
                </div>

                <h3 className="card-title text-lg font-semibold">
                    {title}
                </h3>

                <p className="text-sm opacity-80">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;