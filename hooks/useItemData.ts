import { createItemQueryOptions } from "@/queryOptions/createItemQueryOptions";
import { useQuery } from "@tanstack/react-query";

export const useItemData = () => {
	const itemData = useQuery(createItemQueryOptions());

	const isLoading = itemData.isLoading;

	const isError = itemData.isError;

	const error = itemData.error;

	return {
		itemData: itemData.data,
		error,
		isError,
		isLoading,
	};
};
