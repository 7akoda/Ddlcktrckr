export const cleanDescription = (desc: string) => {
	if (!desc) return "";

	let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

	let superCleaned = cleaned.replace(/{g:citadel_binding:'Reload'}/, "reload");

	superCleaned = superCleaned.replace(/[.]/g, ".\n");

	superCleaned = superCleaned.replace(/<[^>]+>/g, "");

	try {
		const { decode } = require("he");
		superCleaned = decode(superCleaned);
	} catch {}

	superCleaned = superCleaned.replace(/\s+/g, " ").trim();

	return superCleaned;
};

export const cleanDecimals = (scale: number) => {
	const scaleString = String(scale);
	const scaleArr = [...scaleString];
	const filterScale = scaleArr.filter((s) => {
		return s !== "-";
	});

	if (
		filterScale.length <= 1 ||
		filterScale.length <= 2 ||
		filterScale.length <= 3
	) {
		return scale;
	} else {
		for (let i = 2; i < filterScale.length; i++) {
			if (
				filterScale[i + 1] == "0" &&
				filterScale[i] == "0" &&
				filterScale[i + 2] >= "5"
			) {
				return scale.toFixed(i + 2);
			} else if (filterScale[i + 1] == "0" && filterScale[i + 2] >= "5") {
				return scale.toFixed(i + 1);
			} else if (filterScale[i + 1] !== "0" && filterScale[i + 1] < "9") {
				return scale.toFixed(i);
			} else {
				return scale.toFixed(1);
			}
		}
	}
};
