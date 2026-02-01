import { useQuery } from "@tanstack/react-query"
import { getMyPets } from "../../apis/mypages/mypagesApi"

export const useMyPetsQuery = () => {
    useQuery({
        queryKey: ["myPets"],
        queryFn: async () => {
            const res = await getMyPets();
            return res.data;
        },
        retry: 0,
    });
}