import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-ring loading-xl scale-[5]"></span>
        </div>
    );
};

export default Loader;