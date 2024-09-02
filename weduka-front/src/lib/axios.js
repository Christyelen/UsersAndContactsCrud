import axios from "axios";

import { appConfig } from "../config/index";

axios.defaults.baseURL = appConfig.baseUrl;

export const apiClient = axios;
