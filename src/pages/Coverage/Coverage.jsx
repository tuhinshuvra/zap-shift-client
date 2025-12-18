import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
    const serviceCenters = useLoaderData();
    console.log("Service Center Data : ", serviceCenters);

    return (
        <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">

            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center">
                We are available in 64 districts
            </h1>

            {/* Search box (UI only for now) */}


            {/* Map */}
            <div className="mt-10">
                <BangladeshMap
                    serviceCenters={serviceCenters}
                ></BangladeshMap>
            </div>

        </div>
    );
};

export default Coverage;
