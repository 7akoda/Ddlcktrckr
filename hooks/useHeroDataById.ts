import { useQuery } from "@tanstack/react-query";
import {
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
	createPlayerHeroStatsQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";

export const useHeroDataById = (id: number) => {
	const heroDataById = useQuery(createHeroDataByIdQueryOptions(id));
	const itemDataById = useQuery(createItemDataByIdQueryOptions(id));

	const isIdLoading = heroDataById.isLoading || itemDataById.isLoading;
	const isIdError = heroDataById.isError || itemDataById.isError;
	const idError = heroDataById.error || itemDataById.error;

	return {
		heroDataById: heroDataById.data,
		itemDataById: itemDataById.data,

		isIdLoading,
		isIdError,
		idError,
	};
};
