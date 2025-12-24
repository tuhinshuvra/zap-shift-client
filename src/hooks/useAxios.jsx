import axios from "axios";

const axisInstance = axios.create({
    baseURL: `http://localhost:5000`
})

const useAxios = () => {
    return axisInstance;
};

export default useAxios;