import { useQuery } from "@tanstack/react-query"
import { getLikedPosts, getMyPosts } from "../../apis/mypages/mypagesApi"

export const useMyPostsQuery = (enabled = true) => {
    return useQuery({
        queryKey: ["myPosts"],
        queryFn: getMyPosts,
        enabled,
    });
}

export const useLikedPostsQuery = (enabled = true) => {
    return useQuery({
        queryKey: ["likedPosts"],
        queryFn: getLikedPosts,
        enabled,
    });
}