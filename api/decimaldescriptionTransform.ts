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
		filterScale.length <= 3 ||
		(filterScale.length == 4 && filterScale[3] == "0")
	) {
		return scale;
	} else if (
		filterScale.length > 10 &&
		filterScale[4] == "0" &&
		filterScale[5] == "0" &&
		filterScale[6] == "0" &&
		filterScale[7] == "0" &&
		filterScale[8] == "0" &&
		filterScale[9] == "0"
	) {
		return scale.toFixed(0);
	} else {
		for (let i = 2; i < filterScale.length; i++) {
			if (filterScale[i + 1] == "9") {
				return scale.toFixed(i - 1);
			} else if (filterScale[i + 1] !== "0" && filterScale[i + 1] !== "9") {
				return scale.toFixed(i);
			}
		}
	}
};
