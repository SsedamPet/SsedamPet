import { useQuery } from "@tanstack/react-query";
import { getMypageSummary } from "../../apis/mypages/mypagesApi";

export const useMypageSummaryQuery = (enabled = true) => {
    return useQuery({
    queryKey: ["mypageSummary"],
    queryFn: getMypageSummary,
    enabled,
    staleTime: 1000 * 30,
    });
}

