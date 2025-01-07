import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export default api;

export const searchUsers = (query, headers) =>
    api.get(`/search/users?query=${query}`, {headers}).then((res) => res.data);

// Search posts
export const searchPosts = (query, headers) =>
    api.get(`/search/posts?query=${query}`, {headers}).then((res) => res.data);