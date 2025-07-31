export const getItemById = async (id: number) => {
	const res = await fetch(
		`https://assets.deadlock-api.com/v2/items/by-hero-id/${id}`
	);
	if (!res.ok) throw new Error("Failed to fetch");

	return res.json();
};
