import { queryOptions } from "@tanstack/react-query"
import { getHeroData } from "@/api/getHeroData"
import { getHeroStats } from "@/api/getHeroStats"

export const createHeroQueryOptions = () => {
    return queryOptions({
        queryKey: ["heroData"],
        queryFn: getHeroData
    })
}

export const createHeroStatsQueryOptions = () => {
    return queryOptions({
        queryKey: ["heroStats"],
        queryFn: getHeroStats
    })
}