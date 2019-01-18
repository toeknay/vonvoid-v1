import axios from "axios";
import cookies from "js-cookie";
import { setAuthToken, resetAuthToken } from "~/utils/auth";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;

const token = cookies.get("x-access-token");

if (token) {
    setAuthToken(token);
} else {
    resetAuthToken();
}
