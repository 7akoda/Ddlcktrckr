import { queryOptions } from "@tanstack/react-query";
import { getHeroData } from "@/api/getHeroData";
import { getHeroStats } from "@/api/getHeroStats";
import { getPlayerHeroStats } from "@/api/getPlayerHeroStats";
import { getHeroDataById } from "@/api/getHeroDataById";
import { getItemById } from "@/api/getItemById";

export const createHeroQueryOptions = () => {
	return queryOptions({
		queryKey: ["heroData"],
		queryFn: getHeroData,
	});
};

export const createHeroStatsQueryOptions = () => {
	return queryOptions({
		queryKey: ["heroStats"],
		queryFn: getHeroStats,
	});
};

export const createPlayerHeroStatsQueryOptions = (id: string) => ({
	queryKey: ["playerHeroStats", id] as [string, string],
	queryFn: async ({ queryKey }: { queryKey: [string, string] }) => {
		const [_key, playerId] = queryKey;
		return getPlayerHeroStats(playerId);
	},
});

export const createHeroDataByIdQueryOptions = (id: number) => ({
	queryKey: ["heroDataById", id] as [string, number],
	queryFn: async ({ queryKey }: { queryKey: [string, number] }) => {
		const [_key, playerId] = queryKey;
		return getHeroDataById(playerId);
	},
});

export const createItemDataByIdQueryOptions = (id: number) => ({
	queryKey: ["itemDataById", id] as [string, number],
	queryFn: async ({ queryKey }: { queryKey: [string, number] }) => {
		const [_key, playerId] = queryKey;
		return getItemById(playerId);
	},
});

export function createEnrichedHeroQueryOptions() {
	return {
		queryKey: ["enriched-heroes"],
		queryFn: async ({}) => {
			const heroData = await getHeroData();
			const heroStats = await getHeroStats();

			const heroesRaw = heroData.map((hero) => {
				const stats = heroStats.find(
					(stat: { hero_id: any }) => stat.hero_id === hero.id
				);
				const winRate = stats
					? ((stats.wins / stats.matches) * 100).toFixed(2)
					: null;
				const matches = stats?.matches ?? 0;
				return { ...hero, matches, winRate };
			});

			const totalHeroPicks = heroesRaw.reduce(
				(sum, hero) => sum + hero.matches,
				0
			);

			const heroes = heroesRaw.map((hero) => {
				const popularity = (
					(hero.matches / (totalHeroPicks / 12)) *
					100
				).toFixed(2);
				return { ...hero, popularity };
			});

			return heroes;
		},
	};
}
