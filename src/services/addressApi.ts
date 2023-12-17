import axios from "axios";

export function getApi(ctx?: any) {
    const api = axios.create({
        baseURL: 'https://address.portalcatalao.com.br/'
    })
    return api;
}
export const addressApi = getApi();