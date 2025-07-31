export const getHeroStats = async () => {
	const res = await fetch(
		"https://api.deadlock-api.com/v1/analytics/hero-stats"
	);
	if (!res.ok) throw new Error("Failed to fetch");

	return res.json();
};
