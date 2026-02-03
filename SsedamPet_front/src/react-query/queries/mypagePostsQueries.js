import { useQuery } from "@tanstack/react-query"
import { getLikedPosts, getMyPosts } from "../../apis/mypages/mypagesApi"

export const useMyPostsQuery = ( { year, month, enabled = true }) => {
    return useQuery({
        queryKey: ["myPosts", year, month ],
        queryFn: () => getMyPosts({ year, month }),
        enabled,
    });
}

export const useLikedPostsQuery = ({ year, month, enabled = true }) => {
    return useQuery({
        queryKey: ["likedPosts", year, month ],
        queryFn: () => getLikedPosts({ year, month }),
        enabled,
    });
}