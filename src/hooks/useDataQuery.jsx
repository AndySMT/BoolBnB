import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    addProperty,
    addReview,
    getProperties,
    getProperty,
    getReviews,
} from "../globals/apiCalls";

export const useGetPropertiesQuery = (params, enabled) => {
    return useQuery({
        queryKey: ["properties", params],
        queryFn: async () => {
            const res = await getProperties(params);
            return res.data;
        },
        enabled,
    });
};

export const useInfiniteGetPropsQuery = (params, enabled, currPage) => {
    return useInfiniteQuery({
        queryKey: ["propertiesInf", params],
        queryFn: async ({ pageParam }) => {
            const res = await getProperties({ ...params, page: pageParam });
            return res.data;
        },
        enabled,
        initialPageParam: 1,
        getNextPageParam: (_, allPages) => currPage,
    });
};

export const useGetPropertyQuery = (id) => {
    return useQuery({
        queryKey: ["properties", id],
        queryFn: async () => {
            const res = await getProperty(id);
            return res.data;
        },
    });
};

export const useAddPropertyQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // funzione di mutazione per fare la chiamata in post della risorse "properties"
        mutationFn: async (formData) => {
            const res = await addProperty(formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["properties"]);
        },
    });
};

export const useGetReviewsQuery = (propertyId) => {
    return useQuery({
        queryKey: ["reviews", propertyId],
        queryFn: async () => {
            const res = await getReviews(propertyId);
            return res.data;
        },
    });
};

export const useAddReviewQuery = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newReview) => {
            console.log(newReview);
            const res = await addReview(newReview);
            console.log(res.data);
            return res.data;
        },
        //* optimistic update
        // onMutate mostra gia la "risposta" non sincronizzata e salva in una var i vecchi dati di reviews
        onMutate: async (newReview) => {
            await queryClient.cancelQueries(["reviews", id]);
            const previousReviews = queryClient.getQueryData(["reviews", id]);
            queryClient.setQueryData(["reviews", id], (oldQueryData) => {
                return [
                    ...oldQueryData,
                    { id: findMaxId(oldQueryData) + 1, ...newReview },
                ];
            });
            return {
                previousReviews,
            };
        },
        // onError riprende i vecchi dati di reviews e li resetta nella cache con queryKey reviews in caso di errore
        onError: (_error, _reviews, context) => {
            queryClient.setQueryData(["reviews", id], context.previousReviews);
        },
        // effettivo sync dei dati tra client e server con fetch in background
        onSettled: () => {
            queryClient.invalidateQueries(["reviews", id]);
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["reviews", id]);
        // },
    });
};

function findMaxId(array) {
    if (!array.length) return undefined;
    let maxId = array[0]?.id;
    for (let obj of array) {
        if (obj?.id > maxId) {
            maxId = obj.id;
        }
    }
    return maxId;
}
