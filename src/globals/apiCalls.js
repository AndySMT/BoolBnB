import axios from "axios";
import { baseUrl, propsEndpoint, revsEndpoint } from "./apiUrls";

export const getProperties = async () => {
    return await axios.get(baseUrl + propsEndpoint);
};

export const getProperty = async (id) => {
    return await axios.get(baseUrl + propsEndpoint + "/" + id);
};

export const addProperty = async (newProperty) => {
    if (!newProperty) return undefined;
    const {
        title,
        description,
        n_bedrooms,
        n_bathrooms,
        n_beds,
        square_meters,
        address,
        address_number,
        zipcode,
        city,
        property_type,
    } = newProperty;
    // ... spazio per fare validazione
    return await axios.post(baseUrl + propsEndpoint, {
        user_id: null,
        title,
        description,
        n_bedrooms,
        n_bathrooms,
        n_beds,
        square_meters,
        address,
        address_number,
        zipcode,
        city,
        property_type,
    });
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
