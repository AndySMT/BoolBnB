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
    getNewReviews,
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
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["properties"]);
        },
    });
};

export const useInfiniteGetRevsQuery = (property_id) => {
    return useInfiniteQuery({
        queryKey: ["reviews", property_id],
        queryFn: async ({ pageParam }) => {
            const res = await getReviews(property_id, { page: pageParam });
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (_l, _all, lastPageParam) => lastPageParam + 1,
    });
};

export const useGetNewReviewsQuery = (propertyId, count) => {
    return useQuery({
        queryKey: ["newReviews", propertyId],
        queryFn: async () => {
            const res = await getNewReviews(propertyId, { count });
            return res.data;
        },
    });
};

export const useAddReviewQuery = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newReview) => {
            const res = await addReview(newReview);
            return res.data;
        },
        // //* optimistic update
        // // onMutate mostra gia la "risposta" non sincronizzata e salva in una var i vecchi dati di reviews
        // onMutate: async (newReview) => {
        //     // console.log(newReview);
        //     await queryClient.cancelQueries({
        //         queryKey: ["newReviews", id],
        //         exact: true,
        //     });
        //     const previousReviews = queryClient.getQueryData([
        //         "newReviews",
        //         id,
        //     ]);
        //     queryClient.setQueryData(["newReviews", id], (oldQueryData) => {
        //         console.log(oldQueryData);
        //         return {
        //             ...oldQueryData,
        //             // total_res: oldQueryData.total_res + 1,
        //             // results: [
        //             //     ...oldQueryData.results,
        //             //     { id: findMaxId(oldQueryData.results) + 1, ...newReview },
        //             // ],
        //             pages: [
        //                 ...oldQueryData.pages,
        //                 {
        //                     ...oldQueryData.pages[0],
        //                     results:
        //                         oldQueryData.pages[0].results.unshift(
        //                             newReview
        //                         ),
        //                 },
        //             ],
        //         };
        //     });
        //     return {
        //         previousReviews,
        //     };
        // },
        // // onError riprende i vecchi dati di newReviews e li resetta nella cache con queryKey newReviews in caso di errore
        // onError: (_error, _reviews, context) => {
        //     console.log(_error);
        //     queryClient.setQueryData(
        //         ["newReviews", id],
        //         context.previousReviews
        //     );
        // },
        // // effettivo sync dei dati tra client e server con fetch in background
        // onSettled: (data) => {
        //     console.log(data);
        //     queryClient.invalidateQueries({
        //         queryKey: ["newReviews", id],
        //         exact: true,
        //     });
        // },
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["newReviews", id]);
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["likes", property_id],
                exact: true,
            });
        },
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
