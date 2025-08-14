import { useQuery } from "@tanstack/react-query";
import {
	createEnrichedHeroQueryOptions,
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";

export const useHeroData = (id: number) => {
	const heroStats = useQuery(createEnrichedHeroQueryOptions());
	const heroDataById = useQuery(createHeroDataByIdQueryOptions(id));
	const itemDataById = useQuery(createItemDataByIdQueryOptions(id));

	const isLoading =
		heroStats.isLoading || heroDataById.isLoading || itemDataById.isLoading;
	const isError =
		heroStats.isError || heroDataById.isError || itemDataById.isError;
	const error = heroStats.error || heroDataById.error || itemDataById.error;

	return {
		heroStats: heroStats.data,
		heroDataById: heroDataById.data,
		itemDataById: itemDataById.data,
		isLoading,
		isError,
		error,
	};
};
