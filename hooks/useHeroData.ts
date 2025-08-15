import {
	createEnrichedHeroQueryOptions,
	createHeroStatsQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";

export const useHeroData = () => {
	const heroData = useQuery(createEnrichedHeroQueryOptions());
	const heroStats = useQuery(createHeroStatsQueryOptions());

	const isLoading = heroData.isLoading || heroStats.isLoading;

	const isError = heroData.isError || heroStats.isError;

	const error = heroData.error || heroStats.error;

	return {
		heroData: heroData.data,
		heroStats: heroStats.data,
		error,
		isError,
		isLoading,
	};
};
