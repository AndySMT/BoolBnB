import axios from "axios";
import { baseUrl, likesEndpoint, propsEndpoint, revsEndpoint } from "./apiUrls";

export const getProperties = async (params) => {
    return await axios.get(baseUrl + propsEndpoint, { params });
};

export const getProperty = async (id) => {
    return await axios.get(baseUrl + propsEndpoint + "/" + id);
};

export const addProperty = async (data) => {
    return await axios.post(baseUrl + propsEndpoint, data);
};

export const getReviews = async (propertyId, params) => {
    return await axios.get(`${baseUrl}${revsEndpoint}/${propertyId}`, {
        params,
    });
};

export const getNewReviews = async (propertyId, params) => {
    return await axios.get(`${baseUrl}${revsEndpoint}/${propertyId}/new`, {
        params,
    });
};

export const addReview = async (newReview) => {
    const { property_id, title, description, rating } = newReview;
    if (!title || !description || !rating) return undefined;
    console.log(newReview);
    return await axios.post(baseUrl + revsEndpoint, {
        user_id: null,
        property_id,
        title,
        description,
        rating,
    });
};

export const getLikesByPropsId = async (property_id) => {
    if (!property_id) return undefined;
    return await axios.get(baseUrl + likesEndpoint + "/" + property_id);
};

export const addLike = async (property_id) => {
    if (!property_id) return undefined;
    return await axios.post(baseUrl + likesEndpoint, {
        property_id,
    });
};
