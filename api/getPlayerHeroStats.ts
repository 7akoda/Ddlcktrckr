export const getPlayerHeroStats = async (id: string) => {
	const res = await fetch(
		`https://api.deadlock-api.com/v1/players/${id}/hero-stats`
	);
	if (!res.ok) throw new Error("Failed to fetch");
	return res.json();
};
