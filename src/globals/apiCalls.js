import axios from "axios";
import { baseUrl, propsEndpoint, revsEndpoint } from "./apiUrls";

export const getProperties = async (params) => {
    return await axios.get(baseUrl + propsEndpoint, { params });
};

export const getProperty = async (id) => {
    return await axios.get(baseUrl + propsEndpoint + "/" + id);
};

export const addProperty = async (data) => {
    return await axios.post(baseUrl + propsEndpoint, data);
};

export const getReviews = async (propertyId) => {
    return await axios.get(`${baseUrl}${revsEndpoint}/${propertyId}`);
};

export const addReview = async (newReview) => {
    const { property_id, title, description } = newReview;
    if (!title || !description) return undefined;
    return await axios.post(baseUrl + revsEndpoint, {
        user_id: null,
        property_id,
        title,
        description,
    });
};
