export const getItems = async () => {
	const res = await fetch(
		`https://assets.deadlock-api.com/v2/items/by-slot-type/spirit`
	);
	if (!res.ok) throw new Error("Failed to fetch");

	return res.json();
};
