import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    addLike,
    addProperty,
    addReview,
    getLikesByPropsId,
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

export const useInfiniteGetPropsQuery = (params) => {
    return useInfiniteQuery({
        queryKey: ["propertiesInf", params],
        queryFn: async ({ pageParam }) => {
            console.log("ciao");
            const res = await getProperties({ ...params, page: pageParam });
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (_l, _all, lastPageParam) => lastPageParam + 1,
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
            await queryClient.cancelQueries({
                queryKey: ["reviews", id],
                exact: true,
            });
            const previousReviews = queryClient.getQueryData(["reviews", id]);
            queryClient.setQueryData(["reviews", id], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    total_res: oldQueryData.total_res + 1,
                    results: [
                        ...oldQueryData.results,
                        { id: findMaxId(oldQueryData) + 1, ...newReview },
                    ],
                };
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
            queryClient.invalidateQueries({
                queryKey: ["reviews", id],
                exact: true,
            });
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["reviews", id]);
        // },
    });
};

// likes
export const useGetLikesByPropsIdQuery = (property_id) => {
    return useQuery({
        queryKey: ["likes", property_id],
        queryFn: async () => {
            const res = await getLikesByPropsId(property_id);
            return res.data;
        },
    });
};

export const useAddLikeQuery = (property_id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await addLike(property_id);
            return res.data;
        },
        onSuccess: queryClient.invalidateQueries({
            queryKey: ["likes", property_id],
            exact: true,
        }),
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

// * CACHE: OLD reviews/10

// * aggiorno reviews/10 perche ce un nuovo posto
// * => nuova chiamata in post => uso la funzione di mutazione!
// * SE la richiesta è success => allora esista un NEW reviews/10 fuori cache => e poi dico a react query di buttare OLD reviews/10
// * e di rimpiazzarlo con NEW reviews/10 => come? usando invalidateQueries passandogli l'etichetta ( reviews/10 )

// ! CACHE: properties properties/1 pr/2 reviews/1 reviews/7
