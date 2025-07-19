import { queryOptions } from "@tanstack/react-query"
import { getHeroData } from "@/api/getHeroData"
import { getHeroStats } from "@/api/getHeroStats"
import { getPlayerHeroStats } from "@/api/getPlayerHeroStats"
import { getHeroDataById } from "@/api/getHeroDataById"

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

export const createPlayerHeroStatsQueryOptions = (id: string) => ({
    queryKey: ['playerHeroStats', id] as [string, string],
    queryFn: async ({ queryKey }: { queryKey: [string, string] }) => {
      const [_key, playerId] = queryKey;
      return getPlayerHeroStats(playerId);
    }
  });
  
  export const createHeroDataByIdQueryOptions = (id: number) => ({
    queryKey: ['heroDataById', id] as [string, number],
    queryFn: async ({ queryKey }: { queryKey: [string, number] }) => {
      const [_key, playerId] = queryKey;
      return getHeroDataById(playerId);
    }
  });
  
  