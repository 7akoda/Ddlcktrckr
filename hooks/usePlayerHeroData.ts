import { useQuery } from "@tanstack/react-query";
import {
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
	createPlayerHeroStatsQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";

export const usePlayerHeroData = (id: string) => {
	const playerStats = useQuery(createPlayerHeroStatsQueryOptions(id));

	const isIdLoading = playerStats.isLoading;
	const isIdError = playerStats.isError;
	const idError = playerStats.error;

	return {
		playerStats: playerStats.data,
		isIdLoading,
		isIdError,
		idError,
	};
};
