export const getHeroData = async () => {
	const numbers = [
		1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 27, 31,
		35, 50, 52, 58, 60, 63, 72,
	];
	const dataPromises = numbers.map(async (num) => {
		const res = await fetch(`https://assets.deadlock-api.com/v2/heroes/${num}`);
		if (!res.ok) throw new Error("Failed to fetch");

		return await res.json();
	});
	return await Promise.all(dataPromises);
};
