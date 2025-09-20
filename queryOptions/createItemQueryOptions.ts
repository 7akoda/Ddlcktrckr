import { getItems } from "@/api/getItems";
import { queryOptions } from "@tanstack/react-query";

export const createItemQueryOptions = () => {
	return queryOptions({
		queryKey: ["items"],
		queryFn: getItems,
	});
};
