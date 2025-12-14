// module.exports = {
//     theme: {
//         screens: {
//             sm: "640px",
//             md: "768px",
//             lg: "1024px",  // large screens start here
//             xl: "1280px",
//             "2xl": "1536px",
//         },
//         extend: {},
//     },
//     plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}