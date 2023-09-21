import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

function displayError(error: Error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            const textError = axiosError.response.data as {message: string};
            toast.error(`Error: ${textError.message}`);
        } else {
            toast.error(`Network Error: ${error.message}`);
        }
    } else {
        toast.error(`${error}`);
    }
}

export default displayError;